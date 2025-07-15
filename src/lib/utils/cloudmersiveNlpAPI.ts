// @ts-expect-error
import { CloudmersiveNlpApiClient } from "cloudmersive-nlp-api-client";

const defaultClient = CloudmersiveNlpApiClient.ApiClient.instance;

const Apikey = defaultClient.authentications["Apikey"];
Apikey.apiKey = process.env.CLOUDMERSIVE_API_KEY;

const apiInstance = new CloudmersiveNlpApiClient.AnalyticsApi();

const input = new CloudmersiveNlpApiClient.SentimentAnalysisRequest();

const callback = (error: Error | null, data: unknown, response: unknown) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("API called successfully. Returned data: " + data);
  }
};

apiInstance.analyticsSentiment(input, callback);
