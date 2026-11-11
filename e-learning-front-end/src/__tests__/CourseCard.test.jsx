import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CourseCard from '../components/Home/Courses-section/CourseCard';

test('shows the course title, lessons, students and rating', () => {
  const item = { imgUrl: 'course.png', title: 'Intro to Python', lesson: 12, students: 3.5, rating: 4.8 };

  render(
    <MemoryRouter>
      <CourseCard item={item} />
    </MemoryRouter>
  );

  expect(screen.getByText('Intro to Python')).toBeInTheDocument();
  expect(screen.getByText(/12 Lessons/)).toBeInTheDocument();
  expect(screen.getByText(/3.5K/)).toBeInTheDocument();
  expect(screen.getByText(/Rating:4.8/)).toBeInTheDocument();
});
