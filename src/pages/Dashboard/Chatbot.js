import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Wrapper from '../../assets/wrappers/ChatbotPage';
import { getFakeJobs } from '../../utils/fakeJobsApi';

const initialResult = null;
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

const Chatbot = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(initialResult);

  useEffect(() => {
    const loadJobs = async () => {
      const fakeJobs = await getFakeJobs();
      setJobs(fakeJobs);
      if (fakeJobs.length) {
        setSelectedJobId(fakeJobs[0]._id);
        setJobDescription(`${fakeJobs[0].title}\n\n${fakeJobs[0].description}`);
      }
    };

    loadJobs();
  }, []);

  const handleJobChange = (e) => {
    const nextJobId = e.target.value;
    setSelectedJobId(nextJobId);
    const selectedJob = jobs.find((job) => job._id === nextJobId);
    if (selectedJob) {
      setJobDescription(`${selectedJob.title}\n\n${selectedJob.description}`);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setCvFile(file);
  };

  const handleAnalyze = async () => {
    if (!cvFile) {
      toast.error('Please upload a CV file first');
      return;
    }

    if (!jobDescription.trim()) {
      toast.error('Please provide a job description');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('cv_file', cvFile);
      formData.append('job_description', jobDescription);

      const response = await fetch(`${API_BASE_URL}/ats-analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze CV');
      }

      const data = await response.json();
      setResult(data);
      toast.success('ATS analysis ready');
    } catch (error) {
      toast.error('Unable to analyze the CV right now');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className='chatbot-grid'>
        <section className='panel'>
          <h3>AI Resume ATS Analyzer</h3>
          <p className='panel-intro'>
            Upload a resume, choose a job from Jobster, and get an ATS-style match analysis with
            targeted suggestions.
          </p>

          <div className='form-grid'>
            <div className='form-row'>
              <label htmlFor='jobSelect' className='form-label'>
                job from Jobster
              </label>
              <select
                id='jobSelect'
                className='form-select'
                value={selectedJobId}
                onChange={handleJobChange}
              >
                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.title} - {job.company}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-row'>
              <label className='form-label'>selected role</label>
              <div className='status-pill'>
                {jobs.find((job) => job._id === selectedJobId)?.title || 'No job selected'}
              </div>
            </div>

            <div className='form-row'>
              <label htmlFor='cvFile' className='form-label'>
                upload CV
              </label>
              <input
                id='cvFile'
                type='file'
                accept='.pdf,.txt'
                className='form-input'
                onChange={handleFileChange}
              />
              <small className='file-note'>
                Version 1 supports `.pdf` and `.txt` files. {cvFile ? `Selected: ${cvFile.name}` : ''}
              </small>
            </div>

            <div className='form-row'>
              <label htmlFor='jobDescription' className='form-label'>
                job description
              </label>
              <textarea
                id='jobDescription'
                className='form-textarea textarea-lg'
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder='Paste or edit the selected job description here'
              />
            </div>

            <div className='action-row'>
              <button type='button' className='btn' disabled={isLoading} onClick={handleAnalyze}>
                {isLoading ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </div>
          </div>
        </section>

        <section className='panel'>
          <h4>Analysis Results</h4>

          {!result ? (
            <p className='panel-intro'>
              Run an analysis to see ATS score, missing keywords, strengths, weak areas, and a better summary suggestion.
            </p>
          ) : (
            <div className='results-grid'>
              <div className='score-card wide'>
                <div>
                  <h5>ATS Match Score</h5>
                  <p>{result.scoreLabel}</p>
                </div>
                <div className='score-value'>{result.score}%</div>
              </div>

              <div className='result-card'>
                <h5>Missing Keywords</h5>
                <ul>
                  {(result.missingKeywords || []).map((item, index) => (
                    <li key={`missing-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className='result-card'>
                <h5>Strengths</h5>
                <ul>
                  {(result.strengths || []).map((item, index) => (
                    <li key={`strength-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className='result-card'>
                <h5>Weak Areas</h5>
                <ul>
                  {(result.weakAreas || []).map((item, index) => (
                    <li key={`weak-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className='result-card'>
                <h5>Suggested Improvements</h5>
                <ul>
                  {(result.suggestedImprovements || []).map((item, index) => (
                    <li key={`suggestion-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className='result-card wide'>
                <h5>Improved Professional Summary</h5>
                <div className='summary-box'>{result.rewrittenSummary}</div>
              </div>
            </div>
          )}
        </section>
      </div>
    </Wrapper>
  );
};

export default Chatbot;
