"use client";

import useTimer from "@/hooks/useTimer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setTimer } from "@/redux/slices/question/questionSlice";
import { setAnswers } from "@/redux/slices/test/answer.slice";
import { submitTest } from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";
import { OPTIONS_LETTER, TOTAL_TIMER, WARNING_TIME } from "@/utils/mockData";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Questions = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const accessTokenSelector = useAppSelector(
    (state: RootState) => state.auth.tokens.accessToken
  );
  const questionsSelector = useAppSelector(
    (state: RootState) => state.question
  );

  const testAnswersSelector = useAppSelector(
    (state: RootState) => state.answer
  );
  const testSelector = useAppSelector(
    (state: RootState) => state.test.createTest
  );
  const questions = questionsSelector.data;

  const currentQuestionData = questions.find(
    (question) => question.questionId === params.questionId
  );

  const timer = useTimer({
    totalTimer: currentQuestionData?.timeLeft ?? TOTAL_TIMER,
  });

  const currentQuestionIndex = questions.findIndex(
    (question) => question.questionId === params.questionId
  );

  const handleAnswer = (questionId: string | undefined, answer: string) => {

    if (!questionId) return;

    const currentQuestion = questions.find(
      (question) => question.questionId === questionId
    );
    if (currentQuestion?.timeLeft === 0) {
      toast.error("Time's up for this question!");
      return;
    }
    dispatch(setAnswers({ questionId, answer }));
  };

  const handleSubmitTest = async () => {
    if (
      !accessTokenSelector ||
      testSelector.loading ||
      questionsSelector.loading
    ) {
      return;
    }
    try {
      const testId = testSelector.data._id;
      await dispatch(
        submitTest({
          accessToken: accessTokenSelector ?? "",
          testId,
          answers: testAnswersSelector,
        })
      );
    } catch (error) {
      console.error(error);
      toast.error("Error submitting test");
    }
    router.push("/test-score");
  };

  const handleQuestionChange = (type: "next" | "previous") => {
    const step = type === "next" ? 1 : -1;
    const newIndex = currentQuestionIndex + step;

    if (questions[currentQuestionIndex].timeLeft === 0 ) {
      toast.error("Time's up for this question!");
      return;
    }

    if (questions[newIndex].timeLeft > 0) {
      if (newIndex >= 0 && newIndex < questions.length) {
        const nextQuestionId = questions[newIndex].questionId;

        // Go to next/prev question
        router.push(`/question/${nextQuestionId}`);

        // Store timer for current question
        dispatch(
          setTimer({
            questionId: currentQuestionData?.questionId,
            timeLeft: timer,
          })
        );
      } else {
        console.log("No more questions");
        router.push("/test-score");
      }
    }
  };

  useEffect(() => {
    if (timer === 0) {
      dispatch(setAnswers({ questionId: currentQuestionData?.questionId ?? "", answer: '' }));
      handleQuestionChange("next");
    }
    if (timer === WARNING_TIME) {
      toast.warning("⏳ You're almost out of time! Answer quickly.");
    }
  }, [timer]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          {testSelector.data.testName} Test
        </h2>
        <span>{timer}:00</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {currentQuestionData?.question}
        </h3>
        <div className="flex flex-col gap-3">
          {currentQuestionData?.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() =>
                handleAnswer(
                  currentQuestionData.questionId,
                  OPTIONS_LETTER[idx]
                )
              }
              className={`border rounded p-3 text-left cursor-pointer ${
                testAnswersSelector[currentQuestionIndex]?.answer ===
                OPTIONS_LETTER[idx]
                  ? "bg-purple-100 border-purple-500"
                  : "bg-white"
              }`}
            >
              <span className="font-semibold mr-2">{OPTIONS_LETTER[idx]}.</span>{" "}
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handleQuestionChange("previous")}
          className={`${currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer bg-purple-600 text-white"} px-4 py-2 rounded`}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitTest}
            className={`bg-purple-600 text-white px-4 py-2 rounded cursor-pointer`}
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={() => handleQuestionChange("next")}
            className={`${currentQuestionIndex === questions.length - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} bg-purple-600 text-white px-4 py-2 rounded`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;
