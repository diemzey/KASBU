import { useParams } from 'react-router-dom';
import Layout from './layout';

const UserPage = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <div className="relative">
      <Layout isEditorMode={false} onEditorModeChange={() => {}} />
      <div className="fixed bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-[var(--current-bg,white)] from-30% via-[var(--current-bg,white)]/70 to-transparent" />
    </div>
  );
};

export default UserPage; 