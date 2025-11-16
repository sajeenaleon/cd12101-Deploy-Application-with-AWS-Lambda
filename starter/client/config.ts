const apiId = '27e3ihj40h'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-bivxn6zexmi6347u.us.auth0.com',
  clientId: '6wRo6kr0oJ9ndPpdRArc8b0J1mPui62s',
  redirectUri: 'http://localhost:3000',
  audience: 'https://dev-bivxn6zexmi6347u.us.auth0.com/api/v2/',
  scope: 'openid profile email read:todo write:todo delete:todo'
}

// REACT_APP_AUTH0_DOMAIN=dev-bivxn6zexmi6347u.us.auth0.com
// REACT_APP_AUTH0_CLIENT_ID=6wRo6kr0oJ9ndPpdRArc8b0J1mPui62s
// REACT_APP_API_ENDPOINT=https://27e3ihj40h.execute-api.us-east-1.amazonaws.com/dev