export default function Team() {
  return (
    <div className="container p-4">
      <h2 className="mb-4">Kambaz Quizzes - Team Information</h2>
      
      <div className="mb-4">
        <h4>Team Members</h4>
        <p><strong>Prasanna Adarsh Kolli</strong> - Section: Monday 6pm-9:20pm class (CRN:18616)</p>
      </div>

      <div className="mb-4">
        <h4>GitHub Repositories</h4>
        <p>
          <strong>Frontend:</strong>{" "}
          <a href="https://github.com/AdarshKolli/kambaz-next-js" target="_blank" rel="noopener noreferrer">
            https://github.com/AdarshKolli/kambaz-next-js
          </a>
        </p>
        <p>
          <strong>Backend:</strong>{" "}
          <a href="https://github.com/AdarshKolli/kambaz-node-server-app" target="_blank" rel="noopener noreferrer">
            https://github.com/AdarshKolli/kambaz-node-server-app
          </a>
        </p>
      </div>

      <a href="/Account/Signin" className="btn btn-primary">Back to Sign In</a>
    </div>
  );
}