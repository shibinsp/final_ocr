import React, { useState } from 'react';
import { Search, FileText, Filter, Settings, LogOut, BarChart3, Grid3x3, ChevronDown, Clock, Tag, MapPin, Download, Eye, Trash2, Plus, X, Edit2, Save, RotateCcw, RotateCw } from 'lucide-react';

export default function DocumentProcessingUI() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentType, setDocumentType] = useState('all');
  const [editingDocument, setEditingDocument] = useState(null);
  const [editHistory, setEditHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Mock data
  const mockDocuments = [
    {
      id: 1,
      title: 'Property Easement - Building A',
      type: 'Easement',
      date: '2024-01-15',
      status: 'Processed',
      indexData: { deedDate: '2024-01-15', grantor: 'John Smith', location: '123 Main St', town: 'Springfield' },
      metadata: { wwuRef: 'EA-001', ironMountainBarCode: 'IM-EA-001', phsBarCode: 'PHS-EA-001', boxNumber: 'BOX-001', documentType: 'Easement', dateStored: '2024-01-16' },
      originalDoc: 'This is a sample easement document...',
      extractedDoc: 'Extracted Easement Data: Grantor: John Smith, Location: 123 Main St, Date: 2024-01-15',
      extracted: true
    },
    {
      id: 2,
      title: 'Land Deed - Downtown Plot',
      type: 'Land Deed',
      date: '2024-01-20',
      status: 'Processed',
      indexData: { titleNumber: 'LD-2024-001', grantor: 'Property Corp', property: 'Downtown Commercial' },
      metadata: { wwuRef: 'LD-002', ironMountainBarCode: 'IM-LD-002', phsBarCode: 'PHS-LD-002', boxNumber: 'BOX-002', documentType: 'Land Deed', dateStored: '2024-01-21' },
      originalDoc: 'This is a land deed document for commercial property...',
      extractedDoc: 'Extracted Land Deed Data: Title Number: LD-2024-001, Grantor: Property Corp, Property: Downtown Commercial',
      extracted: true
    },
    {
      id: 3,
      title: 'Commercial Lease Agreement',
      type: 'Lease',
      date: '2024-02-01',
      status: 'Processing',
      indexData: { property: 'Commercial Unit 5', dateOfLease: '2024-02-01', commencementDate: '2024-03-01', titleNumber: 'LS-2024-001', grantor: 'ABC Corp', granlorAddress: '456 Business Ave' },
      metadata: { wwuRef: 'LS-003', ironMountainBarCode: 'IM-LS-003', phsBarCode: 'PHS-LS-003', boxNumber: 'BOX-003', documentType: 'Lease', dateStored: '2024-02-02' },
      originalDoc: 'Commercial lease agreement with terms and conditions...',
      extractedDoc: 'Extracted Lease Data: Property: Commercial Unit 5, Date of Lease: 2024-02-01, Commencement: 2024-03-01, Grantor: ABC Corp',
      extracted: false
    },
    {
      id: 4,
      title: 'Poly/Plot Lines Document',
      type: 'Other',
      date: '2024-02-05',
      status: 'Pending Review',
      indexData: {},
      metadata: { wwuRef: 'OTH-004', ironMountainBarCode: 'IM-OTH-004', phsBarCode: 'PHS-OTH-004', boxNumber: 'BOX-004', documentType: 'Plot Lines', dateStored: '2024-02-06' },
      originalDoc: 'Polygon and plot lines data document...',
      extractedDoc: 'Extracted Plot Data: Type: Polygon/Plot Lines',
      extracted: false
    }
  ];

  const documentTypeFilters = ['Easement', 'Land Deed', 'Lease', 'Other'];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         Object.values(doc.indexData).some(val => val.toString().toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = documentType === 'all' || doc.type === documentType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Processed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Processed') return '✓';
    if (status === 'Processing') return '⟳';
    if (status === 'Pending Review') return '!';
    return '?';
  };

  const startEditing = (doc) => {
    const initialState = {
      ...doc,
      metadata: { ...doc.metadata },
      indexData: { ...doc.indexData }
    };
    setEditingDocument(initialState);
    setEditHistory([initialState]);
    setHistoryIndex(0);
  };

  const handleMetadataChange = (field, value) => {
    const updated = { ...editingDocument, metadata: { ...editingDocument.metadata, [field]: value } };
    const newHistory = editHistory.slice(0, historyIndex + 1);
    newHistory.push(updated);
    setEditHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setEditingDocument(updated);
  };

  const handleIndexDataChange = (field, value) => {
    const updated = { ...editingDocument, indexData: { ...editingDocument.indexData, [field]: value } };
    const newHistory = editHistory.slice(0, historyIndex + 1);
    newHistory.push(updated);
    setEditHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setEditingDocument(updated);
  };

  const handleExtractedDocChange = (value) => {
    const updated = { ...editingDocument, extractedDoc: value };
    const newHistory = editHistory.slice(0, historyIndex + 1);
    newHistory.push(updated);
    setEditHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setEditingDocument(updated);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setEditingDocument(editHistory[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < editHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setEditingDocument(editHistory[historyIndex + 1]);
    }
  };

  const saveChanges = () => {
    // Here you would send the updated document to your backend
    console.log('Saving document:', editingDocument);
    alert('Document saved successfully!');
    setEditingDocument(null);
    setEditHistory([]);
  };

  const searchFields = {
    'Easement': ['deedDate', 'grantor', 'location', 'town'],
    'Land Deed': ['titleNumber', 'grantor', 'property'],
    'Lease': ['property', 'dateOfLease', 'commencementDate', 'titleNumber', 'grantor', 'granlorAddress'],
    'Other': []
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100 app-container">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 w-full">
        <div className="flex items-center justify-between px-8 py-4 w-full">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">DocScan System</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-slate-100 rounded-lg">
              <span className="text-sm text-slate-600">User:</span>
              <span className="text-sm font-medium text-slate-900">Admin</span>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition">
              <LogOut className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex w-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 shadow-sm">
          <nav className="p-6 space-y-3">
            <button 
              onClick={() => setActiveTab('search')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'search' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <Search className="w-5 h-5" />
              <span>Search Documents</span>
            </button>
            <button 
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'reports' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Reports</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 w-full min-h-screen">
          {activeTab === 'search' && !editingDocument && (
            <div className="space-y-6">
              {/* Search Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Search & Review Documents</h2>
                
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by title, type, or metadata..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Document Type Filter */}
                <div className="flex items-center space-x-3 mb-6">
                  <Filter className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Document Type:</span>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">All Types</option>
                    {documentTypeFilters.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Search Fields by Document Type */}
                {documentType !== 'all' && searchFields[documentType] && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p className="text-sm font-medium text-slate-700 mb-3">Search Indexed Fields:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {searchFields[documentType].map(field => (
                        <div key={field}>
                          <label className="text-xs text-slate-600 font-medium">{field}</label>
                          <input
                            type="text"
                            placeholder={`Search ${field}...`}
                            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Found <span className="font-bold text-slate-900">{filteredDocuments.length}</span> documents
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {filteredDocuments.map(doc => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 text-sm line-clamp-2">{doc.title}</h3>
                          <p className="text-xs text-slate-500 mt-1">{doc.type}</p>
                        </div>
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${getStatusColor(doc.status)}`}>
                          {getStatusIcon(doc.status)}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-xs text-slate-600">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{new Date(doc.date).toLocaleDateString()}</span>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>

                      <div className="border-t border-slate-100 pt-3">
                        <p className="text-xs text-slate-600 font-medium mb-2">Metadata:</p>
                        <div className="space-y-1 text-xs text-slate-600">
                          {Object.entries(doc.metadata).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="capitalize font-medium">{key}:</span>
                              <span className="text-slate-500 truncate">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <button 
                          onClick={() => setSelectedDocument(doc)}
                          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-xs font-medium">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button 
                          onClick={() => startEditing(doc)}
                          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-xs font-medium">
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detail Modal */}
          {selectedDocument && !editingDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">{selectedDocument.title}</h3>
                  <button onClick={() => setSelectedDocument(null)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-medium mb-1">Document Type</p>
                      <p className="text-lg font-semibold text-slate-900">{selectedDocument.type}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 font-medium mb-1">Status</p>
                      <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDocument.status)}`}>
                        {selectedDocument.status}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Extracted Metadata</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedDocument.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600 capitalize font-medium">{key}</span>
                          <span className="text-slate-900 font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button 
                      onClick={() => {
                        startEditing(selectedDocument);
                        setSelectedDocument(null);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center space-x-2">
                      <Edit2 className="w-4 h-4" />
                      <span>Edit Document</span>
                    </button>
                    <button 
                      onClick={() => setSelectedDocument(null)}
                      className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Editing Document Page */}
          {editingDocument && (
            <div className="space-y-6">
              {/* Toolbar */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-bold text-slate-900">Edit Document</h2>
                  <span className="text-sm text-slate-600">{editingDocument.title}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={undo}
                    disabled={historyIndex <= 0}
                    className="p-2 hover:bg-slate-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo"
                  >
                    <RotateCcw className="w-5 h-5 text-slate-600" />
                  </button>
                  <button 
                    onClick={redo}
                    disabled={historyIndex >= editHistory.length - 1}
                    className="p-2 hover:bg-slate-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Redo"
                  >
                    <RotateCw className="w-5 h-5 text-slate-600" />
                  </button>
                  <div className="w-px h-6 bg-slate-300"></div>
                  <button 
                    onClick={saveChanges}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button 
                    onClick={() => {
                      setEditingDocument(null);
                      setEditHistory([]);
                    }}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Left: Original Document */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Original Document</h3>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 h-96 overflow-y-auto">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{editingDocument.originalDoc}</p>
                  </div>
                </div>

                {/* Right: Extracted & Editable Document */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Extracted Document (Editable)</h3>
                  <textarea
                    value={editingDocument.extractedDoc}
                    onChange={(e) => handleExtractedDocChange(e.target.value)}
                    className="w-full h-96 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono resize-none"
                  />
                </div>
              </div>

              {/* Metadata Editors */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Index Data */}
                {Object.keys(editingDocument.indexData).length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Index Data</h3>
                    <div className="space-y-4">
                      {Object.entries(editingDocument.indexData).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{key}</label>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleIndexDataChange(key, e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Metadata</h3>
                  <div className="space-y-4">
                    {Object.entries(editingDocument.metadata).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{key}</label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleMetadataChange(key, e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Processing Reports</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Total Documents Processed</span>
                  <span className="text-2xl font-bold text-blue-600">24</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Currently Processing</span>
                  <span className="text-2xl font-bold text-yellow-600">3</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Pending Review</span>
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
