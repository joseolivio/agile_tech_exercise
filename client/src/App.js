import React, { useState, useEffect } from "react";
import Categories from "./components/Categories";
import Navbar from "./components/Navbar";
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const url = "localhost/4000";

function App() {
  const [loading, setLoading] = useState(true);
  const [saleData, setSaleData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [graphData, setGraphData] = useState();
  const [graphOptions, setGraphOptions] = useState([]);

  const fetchData = async () => {
    const reponse = await fetch(url);
    const parsedResponse = await reponse.json();
    setSaleData(parsedResponse);

    setSelectedCategory(Object.entries(parsedResponse.category)[0][0]);

    setSelectedProduct(
      Object.entries(parsedResponse.category[`${Object.entries(parsedResponse.category)[0][0]}`])[0][0]
    );

    setSelectedBrand(
      Object.entries(
        parsedResponse.category[`${Object.entries(parsedResponse.category)[0][0]}`][
          `${Object.entries(parsedResponse.category[`${Object.entries(parsedResponse.category)[0][0]}`])[0][0]}`
        ]
      )[0][0]
    );

    // setGraphData(saleData.category[`${selectedCategory}`][`${selectedProduct}`][`${selectedBrand}`]);
    setLoading(false);

    // Set default values:
  };

  const getBrandObject = (object) => {
    return Object.keys(object[`${selectedCategory}`][`${selectedProduct}`]);
  };

  const createGraph = () => {
    if (!saleData.category) {
      return;
    }

    if (saleData.category) {
      setGraphData(saleData.category[`${selectedCategory}`][`${selectedProduct}`][`${selectedBrand}`]);
    }

    if (!graphData) {
      return;
    }

    console.log("graph-data", graphData);
    console.log(graphData.sales[0]);
    console.log(graphData.sales[1]);
    console.log(graphData.sales[2]);
    console.log(graphData.sales[3]);
    const options = {
      data: [
        {
          type: "column",
          name: "Ventas",
          showInLegend: true,

          color: `#7cb4ec`,
          dataPoints: [
            { label: "January", y: graphData.sales[0] },
            { label: "February", y: graphData.sales[1] },
            { label: "March", y: graphData.sales[2] },
            { label: "April", y: graphData.sales[3] },
          ],
        },
      ],
    };

    setGraphOptions(options);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    createGraph();
  }, [graphData]);

  useEffect(() => {
    createGraph();
  }, [selectedBrand]);

  if (loading) {
    return (
      <div className="App">
        <Navbar />
        <section className="section loading">
          <h1>Loading...</h1>
        </section>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <section className="selection-section">
        <div className="category-choice">
          <label htmlFor="categories">Categoria:</label>
          <select
            name="categories"
            id="categories"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedProduct(Object.entries(saleData.category[`${e.target.value}`])[0][0]);
            }}
          >
            {Object.keys(saleData.category).map((value) => {
              return <Categories name={value} key={value} />;
            })}
          </select>
        </div>

        <div className="category-choice">
          <label htmlFor="products">Producto:</label>
          <select
            name="products"
            id="products"
            onChange={(e) => {
              setSelectedProduct(e.target.value);
            }}
          >
            {Object.keys(saleData.category[`${selectedCategory}`]).map((value) => {
              return <Categories name={value} key={value} />;
            })}
          </select>
        </div>

        <div className="category-choice">
          <label htmlFor="brand">Marca:</label>
          <select
            name="brand"
            id="brand"
            onChange={(e) => {
              setSelectedBrand(e.target.value);
            }}
          >
            {getBrandObject(saleData.category).map((value) => {
              return <Categories name={value} key={value} />;
            })}
          </select>
        </div>
      </section>
      <h3>Sales by Month for: {selectedBrand}</h3>
      <div className="graph">
        <CanvasJSChart
          options={graphOptions}
          /* onRef = {ref => this.chart = ref} */
        />
      </div>
    </div>
  );
}

export default App;
