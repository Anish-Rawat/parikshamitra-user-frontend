"use client";

import React, { useState } from "react";

const CreateTestPage: React.FC = () => {
  const [step, setStep] = useState<"configure" | "select" | "success">(
    "configure"
  );
  const [formData, setFormData] = useState({
    testName: "",
    category: "",
    class: "",
    subject: "",
    difficulty: "",
  });
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const questions = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    text: `Sample Question ${i + 1} (hard difficulty)`,
    options: ["Option A", "Option B", "Option C", "Option D"],
  }));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const allFilled = Object.values(formData).every((val) => val !== "");
    if (allFilled) {
      setStep("select");
    } else {
      alert("Please fill all the fields.");
    }
  };

  const handleCreateTest = () => {
    if (selectedQuestions.length > 0) {
      setStep("success");
    } else {
      alert("Please select at least one question.");
    }
  };

  const handleSelectQuestion = (id: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">
            Create a Custom Test
          </h1>
          <p className="text-gray-500 mt-2">
            Fill the form and choose questions to generate your test.
          </p>
        </div>

        <div className="flex justify-between">
          {["configure", "select", "success"].map((s) => (
            <div
              key={s}
              className={`flex-1 text-center py-2 rounded-full text-sm font-medium ${
                step === s
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {s === "configure" && "1. Configure"}
              {s === "select" && "2. Select Questions"}
              {s === "success" && "3. Success"}
            </div>
          ))}
        </div>

        {step === "configure" && (
          <div className="grid grid-cols-1 gap-4">
            <input
              name="testName"
              placeholder="Test Name"
              value={formData.testName}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 w-full"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 w-full"
            >
              <option value="">Select Category</option>
              <option value="class">Class</option>
              <option value="stream">Stream</option>
            </select>

            {formData.category === "class" && (
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="border rounded-lg px-4 py-2 w-full"
              >
                <option value="">Select Class</option>
                {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map(
                  (cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  )
                )}
              </select>
            )}

            {formData.category === "stream" && (
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="border rounded-lg px-4 py-2 w-full"
              >
                <option value="">Select Stream</option>
                {["Medical", "Non-Medical", "Commerce", "Arts"].map(
                  (stream) => (
                    <option key={stream} value={stream}>
                      {stream}
                    </option>
                  )
                )}
              </select>
            )}

            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 w-full"
            >
              <option value="">Select Subject</option>
              {[
                "Math",
                "Science",
                "Biology",
                "Physics",
                "Chemistry",
                "Accounts",
                "Business Studies",
                "History",
              ].map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 w-full"
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button
              onClick={handleNext}
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Continue to Select Questions
            </button>
          </div>
        )}

        {step === "select" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Choose Questions</h2>
            <div className="grid grid-cols-1 gap-4 max-h-[300px] overflow-y-auto">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className={`border p-4 rounded-lg transition hover:shadow ${
                    selectedQuestions.includes(q.id)
                      ? "border-blue-500 bg-blue-50"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(q.id)}
                      onChange={() => handleSelectQuestion(q.id)}
                      className="mr-2"
                    />
                    <span className="font-medium">{q.text}</span>
                  </div>
                  <ul className="text-sm pl-6 space-y-1">
                    {q.options.map((opt, idx) => (
                      <li key={idx}>
                        {String.fromCharCode(65 + idx)}. {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep("configure")}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleCreateTest}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Create Test
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">
              🎉 Test Created Successfully!
            </h2>
            <p className="text-gray-600">
              Your test "
              <span className="font-semibold">{formData.testName}</span>" is
              ready to be shared.
            </p>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <input
                type="text"
                value="https://your-app-link.com/shared-test/xyz123"
                readOnly
                className="flex-1 bg-transparent outline-none"
              />
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    "https://your-app-link.com/shared-test/xyz123"
                  )
                }
                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => {
                setFormData({
                  testName: "",
                  category: "",
                  class: "",
                  subject: "",
                  difficulty: "",
                });
                setSelectedQuestions([]);
                setStep("configure");
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
