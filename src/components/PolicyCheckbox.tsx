import React, { useState } from 'react';
import { WebsiteOwnershipPolicyModal } from './WebsiteOwnershipPolicyModal';

interface PolicyCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  id?: string;
}

export const PolicyCheckbox: React.FC<PolicyCheckboxProps> = ({
  checked,
  onChange,
  className = '',
  id
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkboxId = id || `policy-chk-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <>
      <div className={`flex items-start gap-2.5 my-3 text-left ${className}`}>
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950 cursor-pointer shrink-0 accent-blue-600"
        />
        <label
          htmlFor={checkboxId}
          className="text-[11px] sm:text-xs text-slate-300 select-none cursor-pointer leading-tight"
        >
          I have read and agree to the{' '}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="text-blue-400 font-semibold underline hover:text-blue-300 transition-colors inline-block"
          >
            Website Ownership & Subscription Policy
          </button>
          .
        </label>
      </div>

      <WebsiteOwnershipPolicyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
