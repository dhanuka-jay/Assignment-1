import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Onboarding Assignment</h1>
        <h2><p> This application is built to cater the need for automating simple online store process.</p></h2>
        <hr/>
        <p>Technologies Used to built this application : </p>
        <ol>
                    <li>ASP.NET Core</li>
                    <li>Entity Framework Core </li>
                    <li>React Js</li>
                    <li>Semantic UI</li>
        </ol>
        <hr/>
        <p>References Used while developing this application : </p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='https://react.semantic-ui.com/'>Semantic UI</a> for layout and styling</li>
        </ul>
      </div>
    );
  }
}
