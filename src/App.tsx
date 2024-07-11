import { Button } from './components/ui/button';
import { Component } from './myComponent';



function App() {

  return (
    <>
      <div className='bg-background h-screen flex flex-col items-center gap-52'>
        <Button variant="default" className='w-min'>Click me</Button>
        <Button variant="outline" className='w-min'>Button</Button>
        <div className="w-1/2">
          <Component />
        </div>
      </div>
    </>
  )
}

export default App
