import { memo } from "react";
import { motion } from "framer-motion";
import RunButton from "@/components/ButtonGroup/RunButton";

const ButtonGroup = memo(function ButtonGroup() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 md:gap-3 p-4 md:p-5 absolute left-0 bottom-0 z-10">
      <motion.div
        initial={{ opacity: 0, y: "150%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <RunButton />
      </motion.div>
    </div>
  );
});

export default ButtonGroup;
