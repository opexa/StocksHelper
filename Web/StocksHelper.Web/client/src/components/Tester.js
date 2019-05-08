import React from 'react';

class Tester extends React.Component {
  componentDidMount() {
    this.props.getTestData();
  }

  render() {
    if (this.props.isLoading) {
      return <h1>Data is loding</h1>
    }

    return (
      <div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temp. (C)</th>
              <th>Temp. (F)</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {this.props.testData.map(forecast =>
              <tr key={forecast.dateFormatted}>
                <td>{forecast.dateFormatted}</td>
                <td>{forecast.temperatureC}</td>
                <td>{forecast.temperatureF}</td>
                <td>{forecast.summary}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tester;