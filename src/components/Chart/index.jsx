import React from "react";

const Chart = () => {
    return (
        <>
            <div className="row">
              <div className="col-lg-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Line chart</h4>
                    <canvas id="lineChart" style={{"height":"250px"}}></canvas>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Bar chart</h4>
                    <canvas id="barChart" style={{"height":"230px"}}></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Area chart</h4>
                    <canvas id="areaChart" style={{"height":"250px"}}></canvas>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Doughnut chart</h4>
                    <canvas id="doughnutChart" style={{"height":"250px"}}></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Pie chart</h4>
                    <canvas id="pieChart" style={{"height":"250px"}}></canvas>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Scatter chart</h4>
                    <canvas id="scatterChart" style={{"height":"250px"}}></canvas>
                  </div>
                </div>
              </div>
            </div>
        </>
    );
}

export default Chart;