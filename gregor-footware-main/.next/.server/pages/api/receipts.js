"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/receipts";
exports.ids = ["pages/api/receipts"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "next/dist/compiled/next-server/pages-api.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages-api.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages-api.runtime.dev.js");

/***/ }),

/***/ "(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Freceipts&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Creceipts.js&middlewareConfigBase64=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Freceipts&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Creceipts.js&middlewareConfigBase64=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages-api/module.compiled */ \"(api)/./node_modules/next/dist/server/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(api)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _pages_api_receipts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages\\api\\receipts.js */ \"(api)/./pages/api/receipts.js\");\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_receipts_js__WEBPACK_IMPORTED_MODULE_3__, 'default'));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_receipts_js__WEBPACK_IMPORTED_MODULE_3__, 'config');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/receipts\",\n        pathname: \"/api/receipts\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    userland: _pages_api_receipts_js__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTX0FQSSZwYWdlPSUyRmFwaSUyRnJlY2VpcHRzJnByZWZlcnJlZFJlZ2lvbj0mYWJzb2x1dGVQYWdlUGF0aD0uJTJGcGFnZXMlNUNhcGklNUNyZWNlaXB0cy5qcyZtaWRkbGV3YXJlQ29uZmlnQmFzZTY0PWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDRTtBQUMxRDtBQUNzRDtBQUN0RDtBQUNBLGlFQUFlLHdFQUFLLENBQUMsbURBQVEsWUFBWSxFQUFDO0FBQzFDO0FBQ08sZUFBZSx3RUFBSyxDQUFDLG1EQUFRO0FBQ3BDO0FBQ08sd0JBQXdCLHlHQUFtQjtBQUNsRDtBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZO0FBQ1osQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2VzQVBJUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL3BhZ2VzLWFwaS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IGhvaXN0IH0gZnJvbSBcIm5leHQvZGlzdC9idWlsZC90ZW1wbGF0ZXMvaGVscGVyc1wiO1xuLy8gSW1wb3J0IHRoZSB1c2VybGFuZCBjb2RlLlxuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi4vcGFnZXNcXFxcYXBpXFxcXHJlY2VpcHRzLmpzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGhhbmRsZXIgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsICdkZWZhdWx0Jyk7XG4vLyBSZS1leHBvcnQgY29uZmlnLlxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCAnY29uZmlnJyk7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc0FQSVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFU19BUEksXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9yZWNlaXB0c1wiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3JlY2VpcHRzXCIsXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYXJlbid0IHVzZWQgaW4gcHJvZHVjdGlvbi5cbiAgICAgICAgYnVuZGxlUGF0aDogJycsXG4gICAgICAgIGZpbGVuYW1lOiAnJ1xuICAgIH0sXG4gICAgdXNlcmxhbmRcbn0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlcy1hcGkuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Freceipts&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Creceipts.js&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api)/./pages/api/receipts.js":
/*!*******************************!*\
  !*** ./pages/api/receipts.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nconst uri = process.env.MONGODB_URI;\nconst client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri);\nasync function handler(req, res) {\n    if (req.method === \"POST\") {\n        try {\n            const data = req.body;\n            const { color } = data;\n            if (!color) {\n                return res.status(400).json({\n                    message: \"Color is required.\"\n                });\n            }\n            await client.connect();\n            const database = client.db(\"Customer\");\n            const collection = database.collection(\"Receipts\");\n            // Fetch the latest receipt number for the given color\n            const lastReceipt = await collection.find({\n                color\n            }) // Filter by color\n            .sort({\n                receiptNumber: -1\n            }) // Sort by receiptNumber in descending order\n            .limit(1) // Get the most recent receipt\n            .toArray();\n            // Determine the next receipt number\n            const nextNumber = lastReceipt.length > 0 ? parseInt(lastReceipt[0].receiptNumber) + 1 : 1;\n            const receiptNumber = nextNumber.toString().padStart(4, \"0\"); // Format as 4 digits (e.g., 0001)\n            // Add the new receipt with the calculated receipt number\n            const newReceipt = {\n                ...data,\n                receiptNumber,\n                createdAt: new Date()\n            };\n            const result = await collection.insertOne(newReceipt);\n            res.status(200).json({\n                message: \"Receipt saved successfully!\",\n                result,\n                receipt: newReceipt\n            });\n        } catch (error) {\n            console.error(\"Error saving receipt:\", error);\n            res.status(500).json({\n                message: \"Failed to save receipt.\",\n                error\n            });\n        } finally{\n            await client.close();\n        }\n    } else if (req.method === \"GET\") {\n        try {\n            await client.connect();\n            const { starred } = req.query; // Extract query parameter\n            const database = client.db(\"Customer\");\n            const collection = database.collection(\"Receipts\");\n            // Create filter based on query parameter\n            let filter = {};\n            if (starred === \"true\") {\n                filter = {\n                    Starred: \"True\"\n                };\n            } else if (starred === \"false\") {\n                filter = {\n                    Starred: \"False\"\n                };\n            }\n            // Fetch documents based on the filter\n            const receipts = await collection.find(filter).toArray();\n            res.status(200).json(receipts);\n        } catch (error) {\n            console.error(\"Error fetching receipts:\", error);\n            res.status(500).json({\n                message: \"Failed to fetch receipts.\",\n                error\n            });\n        } finally{\n            await client.close();\n        }\n    } else {\n        res.status(405).json({\n            message: \"Method not allowed.\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLFNBQVM7UUFBc0I7SUFDeEQ7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxNYWxlblxcRG93bmxvYWRzXFxncmVnb3ItZm9vdHdhcmUtbWFpblxcZ3JlZ29yLWZvb3R3YXJlLW1haW5cXHBhZ2VzXFxhcGlcXHJlY2VpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSBcIm1vbmdvZGJcIjtcblxuY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkk7XG5jb25zdCBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IHJlcS5ib2R5O1xuICAgICAgY29uc3QgeyBjb2xvciB9ID0gZGF0YTtcblxuICAgICAgaWYgKCFjb2xvcikge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIkNvbG9yIGlzIHJlcXVpcmVkLlwiIH0pO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBjbGllbnQuY29ubmVjdCgpO1xuICAgICAgY29uc3QgZGF0YWJhc2UgPSBjbGllbnQuZGIoXCJDdXN0b21lclwiKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBkYXRhYmFzZS5jb2xsZWN0aW9uKFwiUmVjZWlwdHNcIik7XG5cbiAgICAgIC8vIEZldGNoIHRoZSBsYXRlc3QgcmVjZWlwdCBudW1iZXIgZm9yIHRoZSBnaXZlbiBjb2xvclxuICAgICAgY29uc3QgbGFzdFJlY2VpcHQgPSBhd2FpdCBjb2xsZWN0aW9uXG4gICAgICAgIC5maW5kKHsgY29sb3IgfSkgLy8gRmlsdGVyIGJ5IGNvbG9yXG4gICAgICAgIC5zb3J0KHsgcmVjZWlwdE51bWJlcjogLTEgfSkgLy8gU29ydCBieSByZWNlaXB0TnVtYmVyIGluIGRlc2NlbmRpbmcgb3JkZXJcbiAgICAgICAgLmxpbWl0KDEpIC8vIEdldCB0aGUgbW9zdCByZWNlbnQgcmVjZWlwdFxuICAgICAgICAudG9BcnJheSgpO1xuXG4gICAgICAvLyBEZXRlcm1pbmUgdGhlIG5leHQgcmVjZWlwdCBudW1iZXJcbiAgICAgIGNvbnN0IG5leHROdW1iZXIgPVxuICAgICAgICBsYXN0UmVjZWlwdC5sZW5ndGggPiAwID8gcGFyc2VJbnQobGFzdFJlY2VpcHRbMF0ucmVjZWlwdE51bWJlcikgKyAxIDogMTtcbiAgICAgIGNvbnN0IHJlY2VpcHROdW1iZXIgPSBuZXh0TnVtYmVyLnRvU3RyaW5nKCkucGFkU3RhcnQoNCwgXCIwXCIpOyAvLyBGb3JtYXQgYXMgNCBkaWdpdHMgKGUuZy4sIDAwMDEpXG5cbiAgICAgIC8vIEFkZCB0aGUgbmV3IHJlY2VpcHQgd2l0aCB0aGUgY2FsY3VsYXRlZCByZWNlaXB0IG51bWJlclxuICAgICAgY29uc3QgbmV3UmVjZWlwdCA9IHsgLi4uZGF0YSwgcmVjZWlwdE51bWJlciwgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpIH07XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbGxlY3Rpb24uaW5zZXJ0T25lKG5ld1JlY2VpcHQpO1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBtZXNzYWdlOiBcIlJlY2VpcHQgc2F2ZWQgc3VjY2Vzc2Z1bGx5IVwiLFxuICAgICAgICByZXN1bHQsXG4gICAgICAgIHJlY2VpcHQ6IG5ld1JlY2VpcHQsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNhdmluZyByZWNlaXB0OlwiLCBlcnJvcik7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHNhdmUgcmVjZWlwdC5cIiwgZXJyb3IgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGF3YWl0IGNsaWVudC5jbG9zZSgpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChyZXEubWV0aG9kID09PSBcIkdFVFwiKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNsaWVudC5jb25uZWN0KCk7XG4gICAgICBjb25zdCB7IHN0YXJyZWQgfSA9IHJlcS5xdWVyeTsgLy8gRXh0cmFjdCBxdWVyeSBwYXJhbWV0ZXJcbiAgICAgIGNvbnN0IGRhdGFiYXNlID0gY2xpZW50LmRiKFwiQ3VzdG9tZXJcIik7XG4gICAgICBjb25zdCBjb2xsZWN0aW9uID0gZGF0YWJhc2UuY29sbGVjdGlvbihcIlJlY2VpcHRzXCIpO1xuXG4gICAgICAvLyBDcmVhdGUgZmlsdGVyIGJhc2VkIG9uIHF1ZXJ5IHBhcmFtZXRlclxuICAgICAgbGV0IGZpbHRlciA9IHt9O1xuICAgICAgaWYgKHN0YXJyZWQgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgIGZpbHRlciA9IHsgU3RhcnJlZDogXCJUcnVlXCIgfTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnJlZCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICAgIGZpbHRlciA9IHsgU3RhcnJlZDogXCJGYWxzZVwiIH07XG4gICAgICB9XG5cbiAgICAgIC8vIEZldGNoIGRvY3VtZW50cyBiYXNlZCBvbiB0aGUgZmlsdGVyXG4gICAgICBjb25zdCByZWNlaXB0cyA9IGF3YWl0IGNvbGxlY3Rpb24uZmluZChmaWx0ZXIpLnRvQXJyYXkoKTtcblxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVjZWlwdHMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgcmVjZWlwdHM6XCIsIGVycm9yKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJGYWlsZWQgdG8gZmV0Y2ggcmVjZWlwdHMuXCIsIGVycm9yIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBhd2FpdCBjbGllbnQuY2xvc2UoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBtZXNzYWdlOiBcIk1ldGhvZCBub3QgYWxsb3dlZC5cIiB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwidXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiY2xpZW50IiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsImRhdGEiLCJib2R5IiwiY29sb3IiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImNvbm5lY3QiLCJkYXRhYmFzZSIsImRiIiwiY29sbGVjdGlvbiIsImxhc3RSZWNlaXB0IiwiZmluZCIsInNvcnQiLCJyZWNlaXB0TnVtYmVyIiwibGltaXQiLCJ0b0FycmF5IiwibmV4dE51bWJlciIsImxlbmd0aCIsInBhcnNlSW50IiwidG9TdHJpbmciLCJwYWRTdGFydCIsIm5ld1JlY2VpcHQiLCJjcmVhdGVkQXQiLCJEYXRlIiwicmVzdWx0IiwiaW5zZXJ0T25lIiwicmVjZWlwdCIsImVycm9yIiwiY29uc29sZSIsImNsb3NlIiwic3RhcnJlZCIsInF1ZXJ5IiwiZmlsdGVyIiwiU3RhcnJlZCIsInJlY2VpcHRzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/receipts.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Freceipts&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Creceipts.js&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();