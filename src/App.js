import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';


const HomeScreen = lazy(() => import("./pages/HomeScreen"))
const LoginScreen = lazy(() => import("./pages/LoginScreen"))
const CompanyMaster = lazy(() => import('./pages/CompanyMaster'))
const EmployeeMaster = lazy(() => import("./pages/EmployeeMaster"))
const BranchMaster = lazy(() => import("./pages/BranchMaster"))
const ContractorMaster = lazy(() => import('./pages/ContractorMaster'))
const LocationSiteMaster = lazy(() => import("./pages/LocationSiteMaster"))
const EmployeeTable = lazy(() => import('./components/employeeMaster/EmployeeTable'))
const BranchMasterTable = lazy(() => import("./components/branchmaster/BranchMasterTable"))
const ContractorMasterTable = lazy(() => import("./components/contractormaster/ContractorMasterTable"))
const LocationMasterTable = lazy(() => import("./components/locationmaster/LocationMasterTable"))
const CompantTable = lazy(() => import('./components/companymaster/CompantTable'))
const ProvidentFundMasterTable = lazy(() => import('./components/calculationMaster/ProvidentFundMasterTable'))
const AddPFcalculationMaster = lazy(() => import('./components/calculationMaster/AddPFcalculationMaster'))
const SalaryCalculationMaster = lazy(() => import('./components/calculationMaster/SalaryCalculationMaster'))

const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <HomeScreen />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/login'
            element={
              <Suspense fallback={<div>Loading.....</div>}>
                <LoginScreen />
              </Suspense>
            }
          />

          <Route
            path='/companymaster'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <CompanyMaster />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/employeemaster'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <EmployeeMaster />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/branchmaster'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <BranchMaster />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/contractormaster'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <ContractorMaster />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/locationsitemaster'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <LocationSiteMaster />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/employee/table'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <EmployeeTable />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/branch/table'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <BranchMasterTable />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/contractor/table'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <ContractorMasterTable />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/location/table'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <LocationMasterTable />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/company/table'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <CompantTable />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/providentFund'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <ProvidentFundMasterTable />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/AddPFcalculationMaster'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <AddPFcalculationMaster />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/EditCalculationMaster/:id'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <AddPFcalculationMaster />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/SalaryCalculationMaster'
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading.....</div>}>
                  <SalaryCalculationMaster />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position='top-right' gutter={20} />
    </>
  )
}

export default App