export const addToList = (answers) => {
  // Do nothing in development mode
  if (import.meta.env.DEV) {
    return;
  }

  const quizData = {
    lifeStage: answers.lifeStage,
    goals: answers.goals.join(", "),
    hormoneSymptoms: answers.hormoneSymptoms.join(", "),
    menopauseSymptoms: answers.menopauseSymptoms.join(", "),
    perimenopauseSymptoms: answers.perimenopauseSymptoms.join(", "),
    stressSymptoms: answers.stressSymptoms.join(", "),
    bloodSugarSymptoms: answers.bloodSugarSymptoms.join(", "),
    nutritionalSymptoms: answers.nutritionalSymptoms.join(", "),
    lifestyle: answers.lifestyle.join(", "),
  };

  const listData = {
    data: {
      type: "subscription",
      attributes: {
        profile: {
          data: {
            type: "profile",
            attributes: {
              properties: quizData,
              subscriptions: {
                email: { marketing: { consent: "SUBSCRIBED" } },
              },
              email: answers.email,
              first_name: answers.firstName,
              last_name: answers.lastName,
            },
          },
        },
        custom_source: "NOA Quiz",
      },
      relationships: { list: { data: { type: "list", id: "TK94Tf" } } },
    },
  };

  const url = "https://a.klaviyo.com/client/subscriptions?company_id=UqU9Pm";
  const options = {
    method: "POST",
    headers: {
      accept: "application/vnd.api+json",
      revision: "2025-07-15",
      "content-type": "application/vnd.api+json",
    },
    body: JSON.stringify(listData),
  };

  fetch(url, options).catch((err) => console.error(err));
};
