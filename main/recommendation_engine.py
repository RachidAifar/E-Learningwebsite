from main.models import Course
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_similar_courses(course_id, top_n=3):
    courses = Course.objects.all()
    df = pd.DataFrame(list(courses.values('course_id', 'course_title', 'technologies')))

    df['technologies'] = df['technologies'].fillna('')

    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(df['technologies'])

    similarity_matrix = cosine_similarity(tfidf_matrix)

    try:
        idx = df[df['course_id'] == course_id].index[0]
    except IndexError:
        return []

    sim_scores = list(enumerate(similarity_matrix[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:top_n+1]

    recommended_ids = [df.iloc[i[0]]['course_id'] for i in sim_scores]
    return Course.objects.filter(course_id__in=recommended_ids)