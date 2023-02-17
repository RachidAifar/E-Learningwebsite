from django.urls import path

from . import views

urlpatterns = [
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>', views.StudentDetails.as_view()),
    path('student_login', views.student_login),
    path('student_enroll_course/', views.StudentEnrollmentList.as_view()),
    path('student_add_favorite_course/', views.StudentFavoriteCoursesList.as_view()),
    path('student_remove_favorite_course/<int:student_id>/<int:course_id>', views.remove_favorite_course),
    path('student_assignment/<int:student_id>/<int:teacher_id>', views.StudentAssignmentList.as_view()),
    path('student/dashboard/<int:pk>/', views.StudentDashBoard.as_view()),
    path('student/change_password/<int:student_id>/', views.student_change_password),
    path('student/fetch_all_notifications/<int:student_id>', views.NotificationList.as_view()),
    path('save_notification/', views.NotificationList.as_view()),


    path('fetch_student_assignment/<int:student_id>', views.MyAssignmentList.as_view()),
    path('update_assignment_status/<int:pk>', views.UpdateAssignmentStatusList.as_view()),


    path('fetch_enroll_status/<int:student_id>/<int:course_id>', views.fetch_enroll_status),
    path('fetch_rating_status/<int:student_id>/<int:course_id>', views.fetch_rating_status),
    path('fetch_allenrolled_students/<int:teacher_id>', views.EnrolledStudentList.as_view()),
    # fetch enrolled  student in specific course :
    path('fetch_enrolled_students/<int:course_id>', views.EnrolledStudentList.as_view()),
    path('fetch_enrolled_courses/<int:student_id>', views.EnrolledStudentList.as_view()),
    path('fetch_recommended_courses/<int:studentId>', views.CourseList.as_view()),
    path('fetch_favorite_courses/<int:student_id>', views.StudentFavoriteCoursesList.as_view()),




    path('course_rating/<int:course_id>', views.CourseRatingList.as_view()),

    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>', views.TeacherDetail.as_view()),
    path('teacher_login', views.teachers_login),
    path('teacher/change_password/<int:teacher_id>/', views.teacher_change_password),
    path('teacher/teacher_dashboard/<int:pk>', views.TeacherDashboard.as_view()),

    path('quiz/', views.QuizList.as_view()),
    path('quiz/<int:pk>', views.QuizDetailView.as_view()),
    path('quiz_questions/<int:quiz_id>', views.QuizQuestionList.as_view()),
    path('quiz_questions/<int:quiz_id>/<int:limit>', views.QuizQuestionList.as_view()),
    path('quiz_assign_course/', views.CourseQuizList.as_view()),
    path('fetch_quiz_assign_status/<int:quiz_id>/<int:course_id>', views.fetch_quiz_assign_status),
    path('fetch_assign_course/', views.CourseQuizList.as_view()),
    path('fetch_assign_quiz/<int:course_id>', views.CourseQuizList.as_view()),

    path('teacher_quiz/<int:teacher_id>/', views.TeacherQuizList.as_view()),
    path('teacher_quiz_detail/<int:pk>', views.TeacherQuizDetail.as_view()),

    path('attempt_quiz/', views.AttemptQuizList.as_view()),
    path('quiz_questions/<int:quiz_id>/next_question/<int:quizQuestion_id>', views.QuizQuestionList.as_view()),
    path('fetch_quiz_attempt_status/<int:quiz_id>/<int:student_id>', views.fetch_quiz_attempt_status),


    path('courseCategory/', views.CourseCategoryList.as_view()),
    path('course/', views.CourseList.as_view()),
    path('course/<int:pk>/', views.CourseDetailView.as_view()),
    path('popular_courses/', views.PopularCourseList.as_view()),
    path('update_view/<int:course_id>/', views.update_view),

    path('teacher_courses/<int:teacher_id>', views.TeacherCourseList.as_view()),
    path('popular_teachers/', views.TeacherList.as_view()),
    # course detail
    path('teacher_course_detail/<int:pk>', views.TeacherCourseDetail.as_view()),

    path('chapter/', views.ChapterList.as_view()),
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    path('course_chapter/<int:course_id>', views.CourseChapterList.as_view()),  # specific course chapter

    path('search_courses/<str:searchstring>', views.CourseList.as_view()),

    # materials of courses
    path('study_materials/<int:course_id>', views.StudyMaterialsList.as_view()),
    path('user/study_materials/<int:course_id>', views.StudyMaterialsList.as_view()),
    path('study_material/<int:pk>', views.StudyMaterialsDetail.as_view()),

    path('attempted_quiz/<int:quiz_id>', views.AttemptQuizList.as_view()),
    path('fetch_quiz_result/<int:quiz_id>/<int:student_id>', views.fetch_quiz_result),



    path('faq/', views.FAQList.as_view()),

]
