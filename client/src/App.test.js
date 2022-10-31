import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test('hay "stop" en Christoph', () => {
//   expect('Christoph').toMatch(/stop/);
// });

// test('prueba', ()=> {
//   render(<App />);
//   const linke = screen.getByText(/home react/);
//   expect(linke).toBeInTheDocument();
// })