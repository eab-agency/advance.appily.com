

export const github = new aws.iam.OpenIdConnectProvider("GithubProvider", {
  url: "https://token.actions.githubusercontent.com",
  clientIdLists: ["sts.amazonaws.com"],
  thumbprintLists: ["d89e3bd43d5d909b47a18977aa9d5ce36cee184c"],
});

export const githubRole = new aws.iam.Role("GithubRole", {
  name: [$app.name, $app.stage, "github"].join("-"),
  assumeRolePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Federated: github.arn,
        },
        Action: "sts:AssumeRoleWithWebIdentity",
        Condition: {
          StringEquals: github.url.apply((url) => ({
            [`${url}:aud`]: "sts.amazonaws.com",
          })),
          StringLike: github.url.apply((url) => ({
            [`${url}:sub`]: "repo:b00y0h/*",
          })),
        },
      },
    ],
  },
});
new aws.iam.RolePolicyAttachment("GithubRolePolicy", {
  policyArn: "arn:aws:iam::aws:policy/AdministratorAccess",
  role: githubRole.name,
});