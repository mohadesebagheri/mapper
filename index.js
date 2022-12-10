const ConverterFactory = require('./converter')


const { parseString } = require('xml2js')
let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<TestScenario>
   <TestSuite name="TS_EdgeHome">
      <TestCaseName name="tc_Login">dt_EdgeCaseHome,dt_EdgeCaseRoute</TestCaseName>
      <TestCaseName name="tc_Logout">dt_EdgeCaseRoute</TestCaseName>
   </TestSuite>
   <TestSuite name="TS_EdgePanel">
      <TestCaseName name="tc_AddContract">dt_EdgeCaseHome,dt_EdgeCaseSpectrum</TestCaseName>
   </TestSuite>
      <TestSuite name="TS_EdgeRoute">
      <TestCaseName name="tc_VerifyContract">dt_EdgeCaseRoute</TestCaseName>
      <TestCaseName name="tc_Payment">dt_EdgeCaseRoute</TestCaseName>
   </TestSuite>
   <TestSuite name="TS_EdgeSpectrum">
      <TestCaseName name="tc_ClientFeedback">dt_EdgeCaseSpectrum</TestCaseName>
   </TestSuite>
</TestScenario>`;
const opts = {
    mergeAttrs: true
}

parseString(xmlString, opts, (err, res) => {
    console.log(JSON.stringify(res, null, 4))
})