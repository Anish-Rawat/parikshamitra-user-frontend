export const API_URIS = {
    auth: {
        login: "auth/login",
        register: "auth/register",
        logout: "auth/logout",
    },
    classes: {
        getClassesAndStreams: "class/get-classes",
    },
    subjects: {
        getSubjects: "subject/get-subjects",
    },
    questions: {
        getQuestions: "question/get-questions",
    },
    tests: {
        createTest: "test/create-test",
        submitTest: "test/submit-test"
    },
    user: {
        createTest: "test/get-test-by-userId",
    }
};

export const CATEGORIES = ["Class", "Stream"];
export const DIFFICULTIES = ["Easy", "Medium", "Hard", "Mixed"];

export const TOTAL_TIMER = 30;
export const OPTIONS_LETTER = ["A", "B", "C", "D"];
export const WARNING_TIME = 15;