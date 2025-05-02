"use client";

import React, { useState } from 'react';

const CreateTestPage: React.FC = () => {
  const [step, setStep] = useState<'configure' | 'select' | 'success'>('configure');
  const [formData, setFormData] = useState({
    testName: '',
    category: '',
    class: '',
    subject: '',
    difficulty: '',
    noOfQuestions: '',
  });
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const questions = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    text: `Sample Question ${i + 1} (hard difficulty)`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (formData.testName && formData.category && formData.class && formData.subject && formData.difficulty) {
      setStep('select');
    } else {
      alert('Please fill all the fields.');
    }
  };

  const handleCreateTest = () => {
    if (selectedQuestions.length > 0) {
      setStep('success');
    } else {
      alert('Please select at least one question.');
    }
  };

  const handleSelectQuestion = (id: number) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const handleKeyDownForNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'backspace'].includes(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create Test</h1>
        <p className="mb-6 text-gray-600">Create a custom test and share it with others</p>

        <div className="flex space-x-2 mb-6">
          <button
            className={`flex-1 py-2 rounded ${step === 'configure' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            disabled={step !== 'configure'}
          >
            Configure Test
          </button>
          <button
            className={`flex-1 py-2 rounded ${step === 'select' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            disabled={step === 'configure'}
          >
            Select Questions
          </button>
        </div>

        {step === 'configure' && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Test Name</label>
              <input
                type="text"
                name="testName"
                value={formData.testName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter a name for your test"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">Select category</option>
                <option value="class">Class</option>
                <option value="stream">Stream</option>
              </select>
            </div>

            {formData.category === 'class' && (
              <div>
                <label className="block font-medium mb-1">Class</label>
                <select name="class" value={formData.class} onChange={handleInputChange} className="w-full p-2 border rounded">
                  <option value="">Select class</option>
                  {['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {formData.category === 'stream' && (
              <div>
                <label className="block font-medium mb-1">Stream</label>
                <select name="class" value={formData.class} onChange={handleInputChange} className="w-full p-2 border rounded">
                  <option value="">Select stream</option>
                  {['Medical', 'Non-Medical', 'Commerce', 'Arts'].map((stream) => (
                    <option key={stream} value={stream}>
                      {stream}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block font-medium mb-1">Subject</label>
              <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">Select subject</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="Biology">Biology</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Accounts">Accounts</option>
                <option value="Business Studies">Business Studies</option>
                <option value="History">History</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Difficulty</label>
              <select name="difficulty" value={formData.difficulty} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">No. of Questions</label>
              <input
                type="text"
                onKeyDown={(e) => handleKeyDownForNumber(e)}
                name="noOfQuestions"
                value={formData.noOfQuestions}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter the number of questions"
              />
            </div>

            <button
              onClick={handleNext}
              className="mt-4 w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
            >
              Continue to Select Questions
            </button>
          </div>
        )}

        {step === 'select' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Select Questions</h2>

            <div className="h-64 overflow-y-auto border rounded p-2 space-y-2">
              {questions.map((q) => (
                <div key={q.id} className="border-b py-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(q.id)}
                      onChange={() => handleSelectQuestion(q.id)}
                      className="mr-2"
                    />
                    <span>{q.text}</span>
                  </div>
                  <ul className="pl-6 text-sm mt-1 space-y-1">
                    {q.options.map((opt, idx) => (
                      <li key={idx}>{String.fromCharCode(65 + idx)}. {opt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep('configure')}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Back to Configuration
              </button>
              <button
                onClick={handleCreateTest}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Create Test
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Test Created Successfully!</h2>
            <p className="mb-4">Your test "{formData.testName}" has been created and is ready to share</p>
            <div className="flex items-center border rounded p-2 mb-4">
              <input
                type="text"
                value="https://your-app-link.com/shared-test/xyz123"
                readOnly
                className="flex-1 p-2"
              />
              <button
                onClick={() => navigator.clipboard.writeText("https://your-app-link.com/shared-test/xyz123")}
                className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => {
                setFormData({ testName: '', category: '', class: '', subject: '', difficulty: '', noOfQuestions: '' });
                setSelectedQuestions([]);
                setStep('configure');
              }}
              className="bg-purple-500 text-white py-2 px-6 rounded hover:bg-purple-600"
            >
              Create Another Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTestPage;
