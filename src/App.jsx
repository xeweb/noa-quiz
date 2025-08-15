import { useState, useRef } from "react";
import { FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { steps } from "./data/quizSteps";
import { advice } from "./data/quizAdvice";

export default function App() {
  const progressBarRef = useRef(null);
  const resultsRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    lifeStage: "",
    goals: [],
    hormoneSymptoms: [],
    stressSymptoms: [],
    bloodSugarSymptoms: [],
    nutritionalSymptoms: [],
    lifestyle: [],
  });

  const scrollToTop = () => {
    if (progressBarRef.current) {
      progressBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }

    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  const handleAnswer = (stepId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [stepId]: value,
    }));
  };

  const handleMultipleAnswer = (stepId, value) => {
    setAnswers((prev) => {
      const currentAnswers = prev[stepId];

      // If unchecking, always allow
      if (currentAnswers.includes(value)) {
        return {
          ...prev,
          [stepId]: currentAnswers.filter((item) => item !== value),
        };
      }

      // If checking, only allow if under 3 selections
      if (currentAnswers.length < 3) {
        return {
          ...prev,
          [stepId]: [...currentAnswers, value],
        };
      }

      // If already at limit, don't add
      return prev;
    });
  };

  const handleSymptomsAnswer = (stepId, value) => {
    setAnswers((prev) => {
      const currentAnswers = prev[stepId];

      // If unchecking, always allow
      if (currentAnswers.includes(value)) {
        return {
          ...prev,
          [stepId]: currentAnswers.filter((item) => item !== value),
        };
      }

      // If checking, only allow if under 3 selections
      if (currentAnswers.length < 3) {
        return {
          ...prev,
          [stepId]: [...currentAnswers, value],
        };
      }

      // If already at limit, don't add
      return prev;
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
    setTimeout(scrollToTop, 100);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    setTimeout(scrollToTop, 100);
  };

  const canProceed = () => {
    const currentStepData = steps[currentStep];
    if (currentStepData.type === "welcome") return true;

    const answer = answers[currentStepData.id];
    if (currentStepData.type === "single") return answer !== "";
    if (
      currentStepData.type === "multiple" ||
      currentStepData.type === "symptoms"
    ) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return false;
  };

  const calculateScores = () => {
    const scores = {
      hormones: 0,
      stress: 0,
      bloodSugar: 0,
      nutritional: 0,
    };

    // Calculate hormone score
    answers.hormoneSymptoms.forEach((symptom) => {
      const symptomData = steps
        .find((s) => s.id === "hormoneSymptoms")
        ?.options.find((o) => o.text === symptom);
      if (symptomData) scores.hormones += symptomData.severity;
    });

    // Calculate stress score
    answers.stressSymptoms.forEach((symptom) => {
      const symptomData = steps
        .find((s) => s.id === "stressSymptoms")
        ?.options.find((o) => o.text === symptom);
      if (symptomData) scores.stress += symptomData.severity;
    });

    // Calculate blood sugar score
    answers.bloodSugarSymptoms.forEach((symptom) => {
      const symptomData = steps
        .find((s) => s.id === "bloodSugarSymptoms")
        ?.options.find((o) => o.text === symptom);
      if (symptomData) scores.bloodSugar += symptomData.severity;
    });

    // Calculate nutritional score
    answers.nutritionalSymptoms.forEach((symptom) => {
      const symptomData = steps
        .find((s) => s.id === "nutritionalSymptoms")
        ?.options.find((o) => o.text === symptom);
      if (symptomData) scores.nutritional += symptomData.severity;
    });

    return scores;
  };

  const getScoreLevel = (score) => {
    if (score <= 2) return "Low";
    if (score <= 4) return "Moderate";
    return "High";
  };

  const getAdvice = (category, level) => {
    return advice[category]?.[level] || { title: "", tips: [] };
  };

  const renderStep = () => {
    const step = steps[currentStep];

    if (currentStep >= steps.length) {
      // Results page
      const scores = calculateScores();
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h2
              className="text-2xl font-semibold text-gray-900 mb-4"
              ref={resultsRef}
            >
              Here's what your answers reveal and where to start:
            </h2>
          </div>

          <div className="space-y-6">
            {Object.entries(scores).map(([category, score]) => {
              const level = getScoreLevel(score);
              const advice = getAdvice(category, level);
              const categoryName = {
                hormones: "Hormones",
                stress: "Stress / HPA Axis",
                bloodSugar: "Blood Sugar",
                nutritional: "Nutritional Status",
              }[category];

              return (
                <div
                  key={category}
                  className="bg-white rounded-lg p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {categoryName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        level === "Low"
                          ? "bg-green-100 text-green-800"
                          : level === "Moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {level}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{advice.title}</p>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">
                      Do this today:
                    </h4>
                    <ul className="space-y-2">
                      {advice.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <a
              href="https://www.nowoftenalways.com/noa-plan-purchase"
              target="_top"
              className="inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-colors bg-[rgb(237,255,198)] border-2 border-black text-black hover:bg-[rgb(217,235,178)]"
            >
              <span>Build my NOA plan</span>
              <FiArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      );
    }

    switch (step.type) {
      case "welcome":
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
            <p className="text-gray-700 text-md leading-relaxed">
              {step.description}
            </p>
          </div>
        );

      case "single":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {step.title}
            </h2>
            <div className="space-y-3">
              {step.options.map((option) => {
                const isSelected = answers[step.id] === option;

                return (
                  <label
                    key={option}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      isSelected ? "border-black bg-gray-50" : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={step.id}
                      value={option}
                      checked={isSelected}
                      onChange={(e) => handleAnswer(step.id, e.target.value)}
                      className="mr-3 text-black focus:ring-black"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case "multiple":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {step.title}
            </h2>
            <div className="mb-4 text-sm text-gray-600">
              Select up to 3 options
            </div>
            <div className="space-y-3">
              {step.options.map((option) => {
                const isSelected = answers[step.id].includes(option);
                const isDisabled = !isSelected && answers[step.id].length >= 3;

                return (
                  <label
                    key={option}
                    className={`flex items-center p-4 border rounded-lg transition-colors ${
                      isDisabled
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                        : isSelected
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={step.id}
                      value={option}
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={(e) =>
                        handleMultipleAnswer(step.id, e.target.value)
                      }
                      className={`mr-3 focus:ring-black ${
                        isDisabled
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-black"
                      }`}
                    />
                    <span
                      className={`${
                        isDisabled ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case "symptoms":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {step.title}
            </h2>
            <div className="mb-4 text-sm text-gray-600">
              Select up to 3 options
            </div>
            <div className="space-y-3">
              {step.options.map((option) => {
                const isSelected = answers[step.id].includes(option.text);
                const isDisabled = !isSelected && answers[step.id].length >= 3;

                return (
                  <label
                    key={option.text}
                    className={`flex items-center p-4 border rounded-lg transition-colors ${
                      isDisabled
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                        : isSelected
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={step.id}
                      value={option.text}
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={(e) =>
                        handleSymptomsAnswer(step.id, e.target.value)
                      }
                      className={`mr-3 focus:ring-black ${
                        isDisabled
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-black"
                      }`}
                    />
                    <span
                      className={`${
                        isDisabled ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {option.text}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white sticky top-0 z-10">
        <div className="h-14 flex items-center justify-center">
          <h1 className="text-xl font-semibold">Now Often Always Quiz</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto">
          {/* Progress Bar */}
          {currentStep < steps.length && (
            <div ref={progressBarRef} className="mb-8">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span>
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Quiz Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {renderStep()}

            {/* Navigation */}
            {currentStep < steps.length && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    currentStep === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  <FiArrowLeft className="mr-2" />
                  Back
                </button>

                {currentStep === steps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                      canProceed()
                        ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    See Results
                    <FiArrowRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                      canProceed()
                        ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Next
                    <FiArrowRight className="ml-2" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
