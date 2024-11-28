import * as aws from "@pulumi/aws";

async function setupOidcProvider() {
  try {
    // Attempt to get the existing OIDC provider
    const existingProvider = await aws.iam.getOpenIdConnectProvider({
      url: "https://token.actions.githubusercontent.com",
    });

    if (existingProvider) {
      console.log(
        "OIDC provider already exists. Setting up the role and permissions."
      );
      
      // Set up the IAM role with the existing provider
      const githubRole = new aws.iam.Role("GithubRole", {
        name: [$app.name, $app.stage, "github"].join("-"),
        assumeRolePolicy: {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Principal: {
                Federated: existingProvider.arn,
              },
              Action: "sts:AssumeRoleWithWebIdentity",
              Condition: {
                StringEquals: {
                  [`${existingProvider.url}:aud`]: "sts.amazonaws.com",
                },
                StringLike: {
                  [`${existingProvider.url}:sub`]: [
                    "repo:eab-agency/*", // Matches all repositories within the eab-agency organization
                  ],
                },
              },
            },
          ],
        },
      });

      // Attach a policy to the role
      new aws.iam.RolePolicyAttachment("GithubRolePolicy", {
        policyArn: "arn:aws:iam::aws:policy/AdministratorAccess", // Consider using a more specific policy
        role: githubRole.name,
      });
    } else {
      console.log(
        "OIDC provider not found, please create the OIDC provider first."
      );
    }
  } catch (error) {
    if ((error as any).message.includes("not found")) {
      console.log(
        "OIDC provider not found, please create the OIDC provider first."
      );
    } else {
      console.error("Error checking OIDC provider:", error);
    }
  }
}

setupOidcProvider();
