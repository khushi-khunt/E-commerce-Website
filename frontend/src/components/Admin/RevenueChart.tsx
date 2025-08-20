import ReactApexChart from "react-apexcharts"

export const RevenueChart = () => {
  const series = [{ name: "Revenue", data: [14000, 18000, 22000, 20000, 25000] }]
  const options = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#0D47A1"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: [
          {
            offset: 0,
            color: "#1976D2",
            opacity: 1,
          },
          {
            offset: 50,
            color: "#64B5F6",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#E3F2FD ",
            opacity: 1,
          },
        ],

      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </div>
  )
}
