import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AwsProfiles from './components/AwsProfiles';

function render() {
    ReactDOM.render(<React.StrictMode><h1>AWS DynamoDB Cost Visualizer test2</h1>
        <AwsProfiles></AwsProfiles> </React.StrictMode>, document.body);
}

render();
