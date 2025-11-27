import { useState } from 'react';

const messages = ['Learn React ⚛️', 'Apply for jobs 💼', 'Invest your new income 🤑'];

function App() {
  return (
    <div>
      <Steps />
      {/* <Steps />
      <Steps /> */}
      <StepMessage step={1}>
        <p>Pass in content</p>
        <p>👋</p>
      </StepMessage>
      <StepMessage step={2}>
        <p>Read children prop</p>
        <p>🫡</p>
      </StepMessage>
    </div>
  );
}

function Steps() {
  // React hook to manage the current step state
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }

  function handleNext() {
    if (step < 3) setStep(step + 1);
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>

          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button bgColor="#e7e7e7" textColor="#333" onClick={() => alert(`Learn how to ${messages[step - 1]}`)}>
                Learn how
              </Button>
            </div>
          </StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" txtColor="#fff" onClick={handlePrevious}>
              <span>⬅️</span>Previous
            </Button>
            <Button bgColor="#7950f2" txtColor="#fff" onClick={handleNext}>
              Next<span>➡️</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}:</h3>
      {children}
    </div>
  );
}

function Button({ txtColor, bgColor, onClick, children }) {
  return (
    <button style={{ backgroundColor: bgColor, color: txtColor }} onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
