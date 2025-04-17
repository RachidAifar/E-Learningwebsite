import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .models import Course, Students


def get_course_recommendations(student_id, top_n=5):
    try:
        student = Students.objects.get(pk=student_id)
    except Students.DoesNotExist:
        return []

    # Fetch all courses
    courses = Course.objects.all()
    if not courses:
        return []

    # Build a dataframe of courses
    df = pd.DataFrame(list(courses.values('course_id', 'course_title', 'course_description', 'technologies')))
    df['text'] = df['course_title'] + ' ' + df['course_description'] + ' ' + df['technologies']

    # Student's profile
    student_profile = student.interested_categories

    # TF-IDF Vectorization
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df['text'].fillna(''))
    student_vector = tfidf.transform([student_profile])

    # Cosine similarity
    cosine_sim = cosine_similarity(student_vector, tfidf_matrix).flatten()

    # Get top N course IDs
    top_indices = cosine_sim.argsort()[-top_n:][::-1]
    recommended_course_ids = df.iloc[top_indices]['course_id'].tolist()

    return recommended_course_ids
