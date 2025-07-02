import React from 'react';
import clsx from 'clsx';

const Keyboard: React.FC = () => {
  const rows = [
    [
      'esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F8', 'F10', 'F11', 'F12', 'touch'
    ],
    [
      '` ~', '1 !', '2 @', '3 #', '4 $', '5 %', '6 ^', '7 &', '8 *', '9 (', '0 )', '- _', '= +', 'delete'
    ],
    [
      'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[ {', '] }', '\\ |'
    ],
    [
      'caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '; :', "' \"", 'return'
    ],
    [
      'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ', <', '. >', '/ ?', 'shift'
    ],
    [
      'fn', 'control', 'option', 'command', 'space', 'command', 'option', 'arrow-left', 'arrow-down', 'arrow-up', 'arrow-right'
    ]
  ];

  const getKeyFlex = (key: string) => {
    // Wider keys
    switch (key) {
      case 'tab':
      case 'caps lock':
      case 'return':
        return 'flex-[1.5]';
      case 'shift':
        return 'flex-[2]';
      case 'command':
      case 'control':
      case 'option':
      case 'delete':
        return 'flex-[1.2]';
      case 'space':
        return 'flex-[5]';
      case 'fn':
        return 'flex-[0.8]';
      case 'touch':
        return 'w-[50px] h-[50px] rounded-full bg-black';
      default:
        return 'flex-1';
    }
  };

  return (
    <div className="bg-black w-full min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] p-4 rounded-2xl shadow-inner w-full max-w-[1000px]">
        <div className="flex flex-col gap-2 w-full">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 w-full">
              {row.map((key, keyIndex) => (
                <div
                  key={keyIndex}
                  className={clsx(
                    'h-[50px] text-white text-sm flex items-center justify-center rounded-md bg-black/90 backdrop-blur-md',
                    getKeyFlex(key),
                    // Updated 3D press effect styles below
                    'shadow-[0_4px_8px_rgba(255,255,255,0.15)]',
                    'hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]',
                    'hover:translate-y-[2px]',
                    'hover:cursor-pointer',
                    'transition duration-150 ease-in-out'
                  )}
                >
                  {key.includes('arrow') ? (
                    <span>
                      {key === 'arrow-up' ? '↑' :
                        key === 'arrow-down' ? '↓' :
                          key === 'arrow-left' ? '←' : '→'}
                    </span>
                  ) : key === 'space' ? '' : key}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
