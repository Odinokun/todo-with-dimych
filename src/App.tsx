import './App.css';
import { Todolist } from './components/Todolist';

function App() {
  const tasks1 = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Rest API', isDone: false },
    { id: 5, title: 'GraphQL', isDone: false },
  ];
  const tasks2 = [
    { id: 1, title: 'The Matrix', isDone: true },
    { id: 2, title: 'The Lord of the Rings', isDone: false },
    { id: 3, title: 'The Hobbit', isDone: false },
  ];

  return (
    <div className='App'>
      <Todolist title='What to learn' tasks={tasks1} />
      <Todolist title='Movies' tasks={tasks2} />
    </div>
  );
}

export default App;
