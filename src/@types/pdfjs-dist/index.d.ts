declare module 'pdfjs-dist/build/pdf' {
    import { GlobalWorkerOptions } from 'pdfjs-dist';
  
    const pdfjs: {
      GlobalWorkerOptions: GlobalWorkerOptions;
      getDocument: any;
      version: string;
    };
  
    export = pdfjs;
  }
  