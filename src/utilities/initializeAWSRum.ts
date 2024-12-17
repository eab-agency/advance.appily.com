import { AwsRum, AwsRumConfig } from "aws-rum-web";

export function initializeAWSRum() {
  try {
    const config: AwsRumConfig = {
      sessionSampleRate: 1,
      identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID || "",
      endpoint: process.env.NEXT_PUBLIC_AWS_CLOUDWATCH_RUM_ENDPOINT || "",
      telemetries: ["performance", "errors", "http"],
      allowCookies: true,
      enableXRay: false,
    };

    const APPLICATION_ID: string = process.env.NEXT_PUBLIC_AWS_APPLICATION_ID || "";
    const APPLICATION_VERSION: string = "1.0.0";
    const APPLICATION_REGION: string = "us-east-1";

    const awsRum: AwsRum = new AwsRum(
      APPLICATION_ID,
      APPLICATION_VERSION,
      APPLICATION_REGION,
      config
    );
  } catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
  }
}
