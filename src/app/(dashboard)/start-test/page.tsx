"use client";

import React, { useState } from "react";

const categories = ["Class", "Stream"];
const classes = ["Class 6", "Class 7", "Class 8"];
const streams = ["Medical", "Non-Medical", "Commerce", "Arts"];
const subjects = {
  "Class 6": ["English", "Maths", "Science"],
  "Class 7": ["English", "Maths", "Science"],
  Medical: ["Biology", "Chemistry", "Physics"],
  "Non-Medical": ["Maths", "Physics", "Chemistry"],
  Commerce: ["Accounts", "Economics", "Business Studies"],
  Arts: ["History", "Political Science", "Geography"],
};
const difficulties = ["Easy", "Medium", "Hard", "Mixed"];

const sampleQuestions = Array.from({ length: 20 }, (_, i) => ({
  question: `Sample Question #${i + 1}`,
  options: ["Option A", "Option B", "Option C", "Option D"],
}));

export default function CreateTestPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    class: "",
    stream: "",
    subject: "",
    difficulty: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(20).fill(null)
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnswer = (index: number, option: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = option;
    setAnswers(updatedAnswers);
  };

  const calculateResult = () => {
    const correct = answers.filter((a) => a !== null).length / 2; // Dummy logic
    return correct;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {step === 1 && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Start Test</h1>
          <div className="grid grid-cols-1 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              className="p-3 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {formData.category === "Class" && (
              <select
                name="class"
                value={formData.class}
                onChange={handleFormChange}
                className="p-3 border rounded"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            )}

            {formData.category === "Stream" && (
              <select
                name="stream"
                value={formData.stream}
                onChange={handleFormChange}
                className="p-3 border rounded"
              >
                <option value="">Select Stream</option>
                {streams.map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </select>
            )}

            <select
              name="subject"
              value={formData.subject}
              onChange={handleFormChange}
              className="p-3 border rounded"
            >
              <option value="">Select Subject</option>
              {(
                subjects[formData.class] ||
                subjects[formData.stream] ||
                []
              ).map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleFormChange}
              className="p-3 border rounded"
            >
              <option value="">Select Difficulty</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
            <button
              className="bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
              onClick={() => setStep(2)}
            >
              Start Test
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{formData.subject} Test</h2>
            <span>{30 - Math.floor((currentQuestion / 20) * 30)}:00</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {sampleQuestions[currentQuestion].question}
            </h3>
            <div className="flex flex-col gap-3">
              {sampleQuestions[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(currentQuestion, opt)}
                  className={`border rounded p-3 text-left ${
                    answers[currentQuestion] === opt
                      ? "bg-purple-100 border-purple-500"
                      : "bg-white"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(prev - 1, 0))
              }
              className="bg-gray-300 px-4 py-2 rounded"
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            {currentQuestion === sampleQuestions.length - 1 ? (
              <button
                onClick={() => setStep(3)}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestion((prev) =>
                    Math.min(prev + 1, sampleQuestions.length - 1)
                  )
                }
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
          <h2 className="text-5xl text-purple-600 font-bold mb-4">
            {Math.floor((calculateResult() / 20) * 100)}%
          </h2>
          <p className="mb-4">
            You scored {calculateResult()} out of 20 questions
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-bold">Total Questions</h4>
              <p>20</p>
            </div>
            <div>
              <h4 className="font-bold">Attempted</h4>
              <p>{answers.filter((a) => a !== null).length}</p>
            </div>
            <div>
              <h4 className="font-bold">Correct</h4>
              <p>{calculateResult()}</p>
            </div>
            <div>
              <h4 className="font-bold">Incorrect</h4>
              <p>
                {answers.filter((a) => a !== null).length - calculateResult()}
              </p>
            </div>
          </div>
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded"
            onClick={() => {
              setFormData({
                category: "",
                class: "",
                stream: "",
                subject: "",
                difficulty: "",
              });
              setAnswers(Array(20).fill(null));
              setCurrentQuestion(0);
              setStep(1);
            }}
          >
            Start New Test
          </button>
        </div>
      )}
    </div>
  );
}
