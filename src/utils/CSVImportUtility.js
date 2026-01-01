// utils/CSVImportUtility.js
import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, XCircle } from 'lucide-react';

const CSVImportUtility = ({ onImport }) => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [mapping, setMapping] = useState({});

  const requiredFields = ['title', 'start', 'country', 'city', 'venue', 'type', 'organizer'];
  const fieldOptions = [
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'start', label: 'Start Date/Time' },
    { value: 'end', label: 'End Date/Time' },
    { value: 'country', label: 'Country Code' },
    { value: 'countryLabel', label: 'Country Name' },
    { value: 'city', label: 'City' },
    { value: 'venue', label: 'Venue' },
    { value: 'address', label: 'Address' },
    { value: 'type', label: 'Event Type' },
    { value: 'tags', label: 'Tags (comma separated)' },
    { value: 'capacity', label: 'Capacity' },
    { value: 'rsvpUrl', label: 'RSVP URL' },
    { value: 'organizer', label: 'Organizer' }
  ];

  const handleFileSelect = useCallback((selectedFile) => {
    if (!selectedFile || !selectedFile.name.endsWith('.csv')) {
      setErrors(['Please select a CSV file']);
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const lines = content.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        // Auto-detect mapping
        const autoMapping = {};
        headers.forEach((header, index) => {
          const match = fieldOptions.find(field => 
            header.includes(field.value.toLowerCase()) ||
            field.value.toLowerCase().includes(header)
          );
          if (match) {
            autoMapping[index] = match.value;
          }
        });

        setMapping(autoMapping);

        // Parse preview data
        const preview = lines.slice(1, 6).map(line => {
          const values = line.split(',').map(v => v.trim());
          return headers.reduce((obj, header, i) => {
            obj[header] = values[i] || '';
            return obj;
          }, {});
        });

        setPreviewData(preview);

        // Validate required fields
        const missingFields = requiredFields.filter(field => 
          !Object.values(autoMapping).includes(field)
        );

        setErrors(
          missingFields.length > 0 
            ? [`Missing required fields: ${missingFields.join(', ')}`]
            : []
        );

      } catch (error) {
        setErrors(['Error parsing CSV file. Please check the format.']);
      }
    };

    reader.readAsText(selectedFile);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleFileInput = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  }, [handleFileSelect]);

  const handleMappingChange = useCallback((csvIndex, field) => {
    setMapping(prev => ({
      ...prev,
      [csvIndex]: field
    }));
  }, []);

  const handleImport = useCallback(() => {
    if (!file || Object.keys(mapping).length === 0) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const events = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.trim());
          const event = {};
          
          Object.entries(mapping).forEach(([index, field]) => {
            if (values[index]) {
              // Handle special fields
              if (field === 'tags') {
                event[field] = values[index].split(',').map(tag => tag.trim());
              } else if (field === 'capacity') {
                event[field] = parseInt(values[index]) || 0;
              } else {
                event[field] = values[index];
              }
            }
          });

          // Add defaults
          return {
            ...event,
            id: `evt-import-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isPublished: true,
            images: []
          };
        });

      onImport(events);
    };

    reader.readAsText(file);
  }, [file, mapping, onImport]);

  const downloadTemplate = useCallback(() => {
    const headers = requiredFields.join(',');
    const exampleRow = requiredFields.map(field => {
      switch(field) {
        case 'title': return 'Flivv Investor Meetup';
        case 'start': return '2024-12-15T10:00:00';
        case 'country': return 'SA';
        case 'countryLabel': return 'KSA';
        case 'city': return 'Riyadh';
        case 'venue': return 'VOCO Hotel';
        case 'type': return 'Meetup';
        case 'organizer': return 'Flivv';
        default: return '';
      }
    }).join(',');
    
    const csvContent = `${headers}\n${exampleRow}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'event-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900 mb-2">CSV Import Instructions</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc pl-4">
          <li>Download the template below for required field format</li>
          <li>Date format: YYYY-MM-DDTHH:MM:SS (e.g., 2024-12-15T10:00:00)</li>
          <li>Country codes: SA (KSA), QA (Qatar), OM (Oman), etc.</li>
          <li>Multiple tags should be comma-separated in one column</li>
        </ul>
      </div>

      {/* File Upload */}
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-700 mb-2">
          Drag & drop your CSV file here, or
        </p>
        <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
          Browse Files
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
        <p className="text-sm text-gray-500 mt-2">
          Maximum file size: 10MB
        </p>
      </div>

      {/* Template Download */}
      <div className="text-center">
        <button
          onClick={downloadTemplate}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FileText size={16} />
          Download CSV Template
        </button>
      </div>

      {/* File Preview */}
      {file && (
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-gray-600" />
                <span className="font-medium">{file.name}</span>
                <span className="text-sm text-gray-500">
                  ({Math.round(file.size / 1024)} KB)
                </span>
              </div>
              {errors.length === 0 ? (
                <CheckCircle size={20} className="text-green-500" />
              ) : (
                <XCircle size={20} className="text-red-500" />
              )}
            </div>
          </div>

          {/* Field Mapping */}
          {previewData.length > 0 && (
            <div className="p-4 border-b">
              <h4 className="font-semibold text-gray-900 mb-3">Map CSV Columns</h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(previewData[0] || {}).map((header, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Column "{header}"
                    </label>
                    <select
                      value={mapping[index] || ''}
                      onChange={(e) => handleMappingChange(index, e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">-- Select Field --</option>
                      {fieldOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Preview */}
          {previewData.length > 0 && (
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Preview (First 5 rows)</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(previewData[0] || {}).map((header, i) => (
                        <th key={i} className="px-3 py-2 text-left font-semibold text-gray-900">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {previewData.map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-50">
                        {Object.values(row).map((value, colIndex) => (
                          <td key={colIndex} className="px-3 py-2 text-gray-700">
                            {value || <span className="text-gray-400">(empty)</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Errors */}
          {errors.length > 0 && (
            <div className="p-4 bg-red-50 border-t border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">Issues Found</h4>
              <ul className="text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <XCircle size={16} />
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Import Button */}
          <div className="p-4 bg-gray-50 border-t">
            <button
              onClick={handleImport}
              disabled={errors.length > 0}
              className={`
                w-full px-4 py-3 rounded-lg font-medium transition-colors
                ${errors.length > 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              Import {previewData.length} Events
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSVImportUtility;