import { FireIcon } from '@heroicons/react/solid';

type Props = {
  title: string;
  subtitle: JSX.Element;
};

const Alert = ({ title, subtitle }: Props) => (
  <div className="p-4 my-4 rounded-md bg-yellow-50">
    <div className="flex">
      <div className="flex-shrink-0">
        <FireIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
        <div className="mt-2 text-sm text-yellow-700">{subtitle}</div>
      </div>
    </div>
  </div>
);

export default Alert;
