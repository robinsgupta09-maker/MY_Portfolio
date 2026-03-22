import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, ExternalLink, Github, Eye, X, Save } from 'lucide-react';
import Modal from '../../components/admin/Modal';
import Toast from '../../components/admin/Toast';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'AI Chatbot',
      description: 'Intelligent chatbot powered by machine learning',
      tech: ['React', 'Node.js', 'TensorFlow'],
      image: '/hero.png',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'Full-stack online shopping platform',
      tech: ['Next.js', 'MongoDB', 'Stripe'],
      image: '/hero.png',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Modern portfolio with animations',
      tech: ['React', 'Tailwind', 'Framer Motion'],
      image: '/hero.png',
      github: 'https://github.com',
      live: 'https://example.com',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    image: '',
    github: '',
    live: '',
  });

  const resetForm = () => {
    setFormData({ title: '', description: '', tech: '', image: '', github: '', live: '' });
    setCurrentProject(null);
  };

  const handleAddProject = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      image: project.image,
      github: project.github,
      live: project.live,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (project) => {
    setCurrentProject(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentProject) {
      setProjects(projects.filter(p => p.id !== currentProject.id));
      setToast({ message: 'Project deleted successfully!', type: 'success' });
      setIsDeleteModalOpen(false);
      setCurrentProject(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProject = {
      id: currentProject ? currentProject.id : Date.now(),
      title: formData.title,
      description: formData.description,
      tech: formData.tech.split(',').map(t => t.trim()).filter(t => t),
      image: formData.image || '/hero.png',
      github: formData.github,
      live: formData.live,
    };

    if (currentProject) {
      setProjects(projects.map(p => p.id === currentProject.id ? newProject : p));
      setToast({ message: 'Project updated successfully!', type: 'success' });
    } else {
      setProjects([...projects, newProject]);
      setToast({ message: 'Project added successfully!', type: 'success' });
    }

    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projects Manager</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <motion.button 
          onClick={handleAddProject}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
        >
          <Plus size={20} />
          Add Project
        </motion.button>
      </motion.div>

      {/* Background Gradient Light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1],
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full flex flex-col items-center justify-center py-20"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-6"
              >
                🚀
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">No projects yet…</h3>
              <p className="text-gray-400 mb-6">Let's build something awesome!</p>
              <motion.button
                onClick={handleAddProject}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all"
              >
                <Plus size={20} />
                Create Your First Project
              </motion.button>
            </motion.div>
          ) : (
            projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onEdit={handleEditProject}
                onDelete={handleDeleteClick}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={currentProject ? 'Edit Project' : 'Add New Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
              placeholder="Project title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white resize-none"
              placeholder="Project description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={formData.tech}
              onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
              placeholder="React, Node.js, MongoDB"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Live URL</label>
              <input
                type="url"
                value={formData.live}
                onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">GitHub URL</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
              placeholder="https://github.com/..."
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
            >
              <Save size={20} />
              {currentProject ? 'Update Project' : 'Create Project'}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-medium"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCurrentProject(null);
        }}
        title="Delete Project"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <Trash2 size={32} className="text-red-400" />
          </div>
          <p className="text-lg mb-6">Are you sure you want to delete <span className="font-bold text-purple-400">{currentProject?.title}</span>?</p>
          <div className="flex gap-3">
            <motion.button
              onClick={confirmDelete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-semibold transition-all"
            >
              Yes, Delete
            </motion.button>
            <motion.button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setCurrentProject(null);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Projects;
