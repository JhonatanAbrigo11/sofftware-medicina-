import { PatientsHeader } from '../components/PatientsHeader';
import { PatientsTable } from '../components/PatientsTable';
import { motion } from 'framer-motion';

export const PatientsPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-8 p-1 sm:p-4"
    >
      <PatientsHeader />
      <PatientsTable />
    </motion.div>
  );
};
