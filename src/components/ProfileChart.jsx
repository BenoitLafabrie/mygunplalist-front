import { useContext, useEffect, useState } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "@chakra-ui/react";
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
      Garage: "Hangar",
      Assembling: "Assemblage",
      Deployed: "Déployé",
    };

    // Create two arrays: one for the labels (status names) and one for the data (status counts)
    const labels = Object.keys(statusCounts).map(
      (status) => statusNameMapping[status] || status
    );
    const data = Object.values(statusCounts);

    // Update the chart data
    setChartData({
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ["#005778", "#A4DD70", "#FF9300"], // Add more colors if you have more statuses
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
