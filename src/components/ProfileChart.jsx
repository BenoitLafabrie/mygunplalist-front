import { useTheme } from "@chakra-ui/react";
import "chart.js/auto";
import { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { UserContext } from "../context/User";

const ProfileChart = () => {
  const { myGunplaList } = useContext(UserContext);
  const theme = useTheme();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // This function runs whenever `myGunplaList` changes

    // Create an object to count the number of items for each status
    const statusCounts = myGunplaList.Items.reduce((counts, item) => {
      const status = item.Item_status.status;
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});

    // Create a mapping object for the status names
    const statusNameMapping = {
      Garage: "En boîte",
      Assembling: "En cours",
      Deployed: "Terminé",
    };
    const statusColorMapping = {
      Garage: "#005778",
      Assembling: "#FF9300",
      Deployed: "#A4DD70",
    };

    // Create three arrays: one for the labels (status names), one for the data (status counts), and one for the colors
    const labels = Object.keys(statusCounts).map(
      (status) => statusNameMapping[status] || status
    );
    const data = Object.values(statusCounts);
    const backgroundColors = Object.keys(statusCounts).map(
      (status) => statusColorMapping[status] || "#000000" // Default color
    );

    // Update the chart data
    setChartData({
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors,
        },
      ],
    });
  }, [myGunplaList]); // Re-run the effect when `myGunplaList` changes

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    font: {
      family: theme.fonts.body,
    },
    responsive: true,
  };

  // Render the chart with the updated data
  return chartData && <Doughnut data={chartData} options={options} />;
};

export default ProfileChart;
