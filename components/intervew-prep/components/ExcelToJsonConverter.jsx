import React, { useId, useState } from "react";
import * as XLSX from "xlsx";
import { Upload, FileUp, Check, AlertCircle, Download } from "lucide-react";

const ExcelToJsonConverter = () => {
  const [jsonData, setJsonData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [conversionStatus, setConversionStatus] = useState(null); // 'success' | 'error' | null
  const id = useId();

  const handleFileUpload = async (event) => {
    setJsonData([]);
    setFileName("");
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsConverting(true);
      setConversionStatus(null);

      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(worksheet);

            const formattedData = parsedData.map((row, index) => {
              const normalizedRow = {};
              Object.keys(row).forEach((key) => {
                normalizedRow[key.trim().toLowerCase()] = row[key];
              });

              return {
                id: id + index + 1,
                topic: normalizedRow["topic"] || "nextjs",
                question: normalizedRow["questions"] || "",
                answer: normalizedRow["answer"] || "",
                tags: normalizedRow["tags"]
                  ? normalizedRow["tags"].split(",")
                  : [],
                keyFeatures: normalizedRow["keyfeatures"]
                  ? normalizedRow["keyfeatures"].split(",")
                  : [],
                actionWords: normalizedRow["actionwords"]
                  ? normalizedRow["actionwords"].split(",")
                  : [],
                codeExample: normalizedRow["codeexample"] || "",
              };
            });

            setJsonData(formattedData);
            setConversionStatus("success");
          } catch (error) {
            console.error("Conversion error:", error);
            setConversionStatus("error");
          }
          setIsConverting(false);
        };

        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("File reading error:", error);
        setConversionStatus("error");
        setIsConverting(false);
      }
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: "application/json",
      });

      // Create download URL
      const url = window.URL.createObjectURL(blob);

      // Create temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName.replace(/\.[^/.]+$/, "") + ".json";

      // Append to document, click, and cleanup
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Download error:", error);
      setConversionStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* File Upload Section */}
      <div className="mb-8">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-blue-500" />
              <p className="mb-2 text-lg text-gray-700">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-sm text-gray-500">
                Excel files only (XLSX, XLS)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {/* Status Section */}
      {fileName && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            conversionStatus === "success"
              ? "bg-green-50"
              : conversionStatus === "error"
              ? "bg-red-50"
              : "bg-blue-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {conversionStatus === "success" ? (
                <Check className="w-6 h-6 text-green-500" />
              ) : conversionStatus === "error" ? (
                <AlertCircle className="w-6 h-6 text-red-500" />
              ) : (
                <FileUp className="w-6 h-6 text-blue-500" />
              )}
              <div>
                <p className="font-medium text-gray-800">{fileName}</p>
                <p className="text-sm text-gray-600">
                  {conversionStatus === "success"
                    ? "Conversion successful!"
                    : conversionStatus === "error"
                    ? "Error converting file. Please try again."
                    : "Converting file..."}
                </p>
              </div>
            </div>
            {conversionStatus === "success" && (
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download JSON</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Preview Section */}
      {jsonData.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Preview</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <pre className="p-4 text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(jsonData.slice(0, 2), null, 2)}
                {jsonData.length > 2 &&
                  "\n\n... and " + (jsonData.length - 2) + " more items"}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelToJsonConverter;
