const keys = require("../config/keys");
const mongoose = require("mongoose");

const SubjectCollection = mongoose.model("subjects");

module.exports = app => {
  app.post("/api/submit-code", async (request, response) => {
    try {
      // Possible conditions:
        // tallLeftExpectHigh: tall tree on the left side and most children
        // get the egg to the top on the first try
        // tallLeftExpectLow: tall tree on the left side and most children
        // don't get the egg to the top on the first try
        // tallRightExpectHigh: tall tree on the right side and most children
        // get the egg to the top on the first try
        // tallRightExpectLow: tall tree on the right side and most children
        // don't get the egg to the top on the first try
        // baseline: 

      // change background
      // change video
      // change which side is associated with the tall/short tree
      // rerecord instruction

      // only count conditions of all the subjects who actually completed the
      // full experiment
      const previousSubjectConditions = await SubjectCollection.find(
        { code: { $exists: true } },
        { condition: 1, _id: 0 }
      );

      let conditionsCount = {
        tallLeftExpectHigh: 0,
        tallLeftExpectLow: 0,
        tallRightExpectHigh: 0,
        tallRightExpectLow: 0,
        baseline: 0
      }

      for (let i = 0; i < previousSubjectConditions.length; i++) {
        conditionsCount[previousSubjectConditions[i].condition]++;
      }

      // leftover conditions from previous experiment version
      delete conditionsCount.increasing
      delete conditionsCount.constant

      let minimumAssignedCondition = "tallLeftExpectHigh";
      let minimumAssignedConditionCount = conditionsCount[minimumAssignedCondition];

      for (const [key,] of Object.entries(conditionsCount)) {
        if (conditionsCount[key] < minimumAssignedConditionCount) {
          minimumAssignedCondition = key;
          minimumAssignedConditionCount = conditionsCount[key];
        }
      }

      const newSubjectCondition = minimumAssignedCondition;

      const newSubject = new SubjectCollection({
        condition: newSubjectCondition,
        code: request.body.code,
        childBirthDate: request.body.childBirthDate
      });

      await newSubject.save();

      subjectDBInfo = {
        dBID: newSubject._id,
        condition: newSubject.condition
      };
      response.send(subjectDBInfo);
    } catch (error) {
      response.send(error);
    }
  });
};
