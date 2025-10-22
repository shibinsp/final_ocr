# DocScan System - Document Processing UI

A modern, responsive web application for document processing, search, and management built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Document Search & Filtering**: Advanced search capabilities with document type filtering
- **Document Management**: View, edit, and manage documents with metadata
- **Responsive Design**: Full-width layout that adapts to any screen size
- **Modern UI**: Clean, professional interface with intuitive navigation
- **Document Cards**: Visual document representation with status indicators
- **Reports Dashboard**: Processing statistics and analytics
- **Edit History**: Undo/redo functionality for document editing

## 📋 Document Types Supported

- **Easements**: Property easement documents with location and grantor details
- **Land Deeds**: Land ownership documents with title numbers and property information
- **Leases**: Commercial and residential lease agreements
- **Other Documents**: Miscellaneous document types including plot lines

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shibinsp/final_ocr.git
   cd final_ocr
   ```

2. **Navigate to the application directory**
   ```bash
   cd doc-ui
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎨 Project Structure

```
final_ocr/
├── doc-ui/                           # Main React application
│   ├── src/
│   │   ├── DocumentProcessingUI.tsx  # Main application component
│   │   ├── App.tsx                   # Root component
│   │   ├── index.css                 # Global styles
│   │   └── main.tsx                  # Application entry point
│   ├── index.html                    # HTML template
│   ├── package.json                  # Dependencies and scripts
│   └── vite.config.ts               # Vite configuration
├── doc_processing_ui.tsx             # Original component file
└── README.md                         # This file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Features Overview

### Document Search
- **Global Search**: Search across document titles, types, and metadata
- **Type Filtering**: Filter documents by type (Easement, Land Deed, Lease, Other)
- **Advanced Fields**: Document-type specific search fields for precise filtering

### Document Management
- **Document Cards**: Visual representation with status indicators
- **View Mode**: Detailed document information in modal view
- **Edit Mode**: Full editing capabilities with undo/redo functionality
- **Status Tracking**: Processed, Processing, and Pending Review states

### User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Full-Width Layout**: Utilizes complete browser width without empty spaces
- **Modern Styling**: Professional appearance with consistent design language
- **Intuitive Navigation**: Easy-to-use sidebar navigation

## 🎯 Document Status Indicators

- ✅ **Processed** - Document has been fully processed
- 🔄 **Processing** - Document is currently being processed
- ⚠️ **Pending Review** - Document requires manual review

## 📊 Metadata Fields

### Common Fields
- **WWU Reference**: Internal reference number
- **Iron Mountain Barcode**: Physical storage barcode
- **PHS Barcode**: Processing system barcode
- **Box Number**: Physical storage location
- **Date Stored**: Storage date

### Document-Specific Fields
- **Easements**: Deed date, grantor, location, town
- **Land Deeds**: Title number, grantor, property details
- **Leases**: Property, lease date, commencement date, grantor address

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

### Recommended Hosting Services
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Shibin Shanmughamprema**
- GitHub: [@shibinsp](https://github.com/shibinsp)

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the maintainer

## 🔄 Version History

- **v1.0.0** - Initial release with full document processing functionality
  - Document search and filtering
  - Document management with edit capabilities
  - Responsive full-width layout
  - Modern UI with Tailwind CSS

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
