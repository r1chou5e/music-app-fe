import React from "react";
import { motion } from "framer-motion";

const DashboardCard = ({ icon, name, count }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-red-400 flex flex-col items-center justify-center"
    >
      {icon}
      <p className="text-xl text-white font-semibold">{name}</p>
      <p className="text-xl text-white font-semibold">{count}</p>
    </motion.div>
  );
};

export default DashboardCard;
