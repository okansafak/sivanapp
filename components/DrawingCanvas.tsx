import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pencil, Undo } from 'lucide-react';

interface DrawingCanvasProps {
  initialData: string;
  onChange: (base64Data: string) => void;
  disabled: boolean;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ initialData, onChange, disabled }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(!initialData);

  // Initialize canvas with existing data or set size
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set logical size matches visual size
    const resizeCanvas = () => {
      // Save current content
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx?.drawImage(canvas, 0, 0);

      // Resize
      canvas.width = container.clientWidth;
      canvas.height = 300; // Fixed height for consistency

      // Restore styling
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000000';
        
        // If we have initial data (from props) load it
        if (initialData) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
            img.src = initialData;
        } else {
             // If we were resizing and had content, restore it (imperfect but better than losing it)
             // For this simple implementation, we might clear on heavy resize or need complex scaling.
             // Prioritizing the initialData load.
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []); // Run once on mount

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      save();
    }
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onChange(dataUrl);
      setIsEmpty(false);
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      onChange(''); // Clear data
      setIsEmpty(true);
    }
  };

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-white shadow-inner overflow-hidden touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className={`w-full h-[300px] cursor-crosshair ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        />
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 select-none">
            <div className="text-center">
              <Pencil className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span>Buraya çizin / yazın</span>
            </div>
          </div>
        )}
      </div>
      
      {!disabled && (
        <div className="flex justify-end">
          <button 
            onClick={clear}
            className="flex items-center text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-red-200"
            title="Temizle"
          >
            <Eraser className="w-4 h-4 mr-1.5" /> Temizle
          </button>
        </div>
      )}
    </div>
  );
};

export default DrawingCanvas;