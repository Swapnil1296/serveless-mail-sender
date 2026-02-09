import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './cyberpunk.module.css';

const API_URL = 'http://localhost:3001';

export default function NaukariScraper() {
  const [config, setConfig] = useState({
    maxPages: 1,
    experience: 3,
    jobAge: 1,
    autoApply: true,
    scrapeMNC: false,
    useAI: false,
    matchThreshold: 50,
  });

  const [status, setStatus] = useState({
    isRunning: false,
    jobsFound: 0,
    applied: 0,
    skipped: 0,
    dailyLimit: 0,
    maxLimit: 50,
  });

  const [sessionStatus, setSessionStatus] = useState({
    normalSession: { exists: false },
    mncSession: { exists: false },
  });

  const [logs, setLogs] = useState<Array<{ type: string; message: string; timestamp: Date }>>([]);
  const logEndRef = useRef<HTMLDivElement>(null);
  const [jobHistory, setJobHistory] = useState<Array<{
    title: string;
    company: string;
    location: string;
    reason: string;
    appliedAt: string;
    link: string;
  }>>([]);
  const [jobStats, setJobStats] = useState({ total: 0, applied: 0, redirect: 0, failed: 0 });
  const [showJobHistory, setShowJobHistory] = useState(false);

  useEffect(() => {
    fetchStatus();
    fetchSessionStatus();
  }, []);

  useEffect(() => {
    if (!status.isRunning) return;
    const poll = async () => {
      const [statusRes, logsRes] = await Promise.all([
        axios.get(`${API_URL}/api/status`).catch(() => null),
        axios.get(`${API_URL}/api/scrape/logs`).catch(() => null),
      ]);
      if (statusRes?.data) {
        setStatus(statusRes.data);
        if (statusRes.data.jobsFound > 0 && !showJobHistory) setShowJobHistory(true);
      }
      if (logsRes?.data?.logs?.length) {
        setLogs(
          logsRes.data.logs.map((l: { level?: string; message: string; timestamp: string }) => ({
            type: l.level || 'info',
            message: l.message,
            timestamp: new Date(l.timestamp),
          }))
        );
      }
    };
    const interval = setInterval(poll, 2500);
    poll();
    return () => clearInterval(interval);
  }, [status.isRunning, showJobHistory]);

  useEffect(() => {
    if (showJobHistory) fetchJobHistory();
  }, [showJobHistory]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/status`);
      setStatus(response.data);
    } catch (error) {
      console.error('Failed to fetch status:', error);
    }
  };

  const fetchSessionStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/session/status`);
      setSessionStatus(response.data);
    } catch (error) {
      console.error('Failed to fetch session status:', error);
    }
  };

  const fetchJobHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/jobs/history`);
      setJobHistory(response.data.jobs || []);
      setJobStats(response.data.stats || { total: 0, applied: 0, redirect: 0, failed: 0 });
    } catch (error) {
      console.error('Failed to fetch job history:', error);
    }
  };

  const clearSessions = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/session/clear`);
      addLog('success', response.data.message);
      fetchSessionStatus();
    } catch {
      addLog('error', 'Failed to clear sessions');
    }
  };

  const startScraper = async () => {
    try {
      setLogs([{ type: 'info', message: 'Starting scraper...', timestamp: new Date() }]);
      setStatus((prev) => ({ ...prev, isRunning: true }));

      const response = await axios.post(`${API_URL}/api/scrape/start`, config);

      addLog('success', response.data.message || 'Scraper started successfully');
      addLog('info', 'Scraper is running in background. Results will appear when complete.');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      addLog('error', err.response?.data?.error || 'Failed to start scraper');
      setStatus((prev) => ({ ...prev, isRunning: false }));
    }
  };

  const stopScraper = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/scrape/stop`);
      addLog('warning', response.data.message || 'Scraper stopped');
      setStatus((prev) => ({ ...prev, isRunning: false }));
    } catch {
      addLog('error', 'Failed to stop scraper');
    }
  };

  const refreshResults = async () => {
    addLog('info', 'Refreshing results...');
    await fetchStatus();
    await fetchJobHistory();
    addLog('success', 'Results refreshed!');
  };

  const resetCounter = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/reset-counter`);
      addLog('success', response.data.message || 'Counter reset successfully');
      fetchStatus();
    } catch {
      addLog('error', 'Failed to reset counter');
    }
  };

  const addLog = (type: string, message: string) => {
    setLogs((prev) => [...prev, { type, message, timestamp: new Date() }]);
  };

  const logTypeClass = (type: string) => {
    const t = (type || 'info').toLowerCase();
    const key = 'log' + (t.charAt(0).toUpperCase() + t.slice(1));
    return (styles as Record<string, string>)[key] ?? (styles as Record<string, string>).logInfo;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Job Scraper Dashboard</h1>
        <p>Automated Naukri.com Job Application System</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Configuration</h2>

        <div className={styles.controls}>
          <div className={styles.inputGroup}>
            <label>Max Pages</label>
            <input
              type="number"
              value={config.maxPages}
              onChange={(e) => setConfig({ ...config, maxPages: parseInt(e.target.value, 10) })}
              min={1}
              max={10}
              disabled={status.isRunning}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Experience (Years)</label>
            <input
              type="number"
              value={config.experience}
              onChange={(e) => setConfig({ ...config, experience: parseInt(e.target.value, 10) })}
              min={0}
              max={20}
              disabled={status.isRunning}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Job Age (Days)</label>
            <input
              type="number"
              value={config.jobAge}
              onChange={(e) => setConfig({ ...config, jobAge: parseInt(e.target.value, 10) })}
              min={1}
              max={30}
              disabled={status.isRunning}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>AI Match Threshold (%)</label>
            <input
              type="number"
              value={config.matchThreshold}
              onChange={(e) =>
                setConfig({ ...config, matchThreshold: parseInt(e.target.value, 10) })
              }
              min={0}
              max={100}
              disabled={status.isRunning || !config.useAI}
            />
          </div>
        </div>

        <div className={styles.controls}>
          <div className={`${styles.inputGroup} ${styles.checkboxGroup}`}>
            <input
              type="checkbox"
              id="autoApply"
              checked={config.autoApply}
              onChange={(e) => setConfig({ ...config, autoApply: e.target.checked })}
              disabled={status.isRunning}
            />
            <label htmlFor="autoApply">Auto Apply to Jobs</label>
          </div>

          <div className={`${styles.inputGroup} ${styles.checkboxGroup}`}>
            <input
              type="checkbox"
              id="scrapeMNC"
              checked={config.scrapeMNC}
              onChange={(e) => setConfig({ ...config, scrapeMNC: e.target.checked })}
              disabled={status.isRunning}
            />
            <label htmlFor="scrapeMNC">MNC Companies Only</label>
          </div>

          <div className={`${styles.inputGroup} ${styles.checkboxGroup}`}>
            <input
              type="checkbox"
              id="useAI"
              checked={config.useAI}
              onChange={(e) => setConfig({ ...config, useAI: e.target.checked })}
              disabled={status.isRunning}
            />
            <label htmlFor="useAI">Use AI Matching</label>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={startScraper}
            disabled={status.isRunning}
          >
            {status.isRunning ? (
              <span className={styles.loadingText}>
                <span className={styles.spinner} />
                Running...
              </span>
            ) : (
              'Start Scraper'
            )}
          </button>

          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={stopScraper}
            disabled={!status.isRunning}
          >
            Stop
          </button>

          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={resetCounter}
            disabled={status.isRunning}
          >
            Reset Counter
          </button>

          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={clearSessions}
            disabled={status.isRunning}
            title="Clear saved sessions to force fresh login"
          >
            Clear Sessions
          </button>

          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={refreshResults}
            title="Refresh status and job history"
          >
            Refresh Results
          </button>
        </div>

        <div className={styles.sessionBox}>
          <strong>Session Status:</strong>
          <div className={styles.sessionRow}>
            Normal: {sessionStatus.normalSession.exists ? 'Active' : 'Not found'} | MNC:{' '}
            {sessionStatus.mncSession.exists ? 'Active' : 'Not found'}
          </div>
          <div className={styles.sessionHint}>
            Sessions are reused to avoid repeated logins. Clear if you face authentication issues.
          </div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.statusSection}`}>
        <h2 className={styles.sectionTitle}>Statistics</h2>

        <div className={styles.statusGrid}>
          <div className={styles.statCard}>
            <h3>{status.jobsFound}</h3>
            <p>Jobs Found</p>
          </div>
          <div className={styles.statCard}>
            <h3>{status.applied}</h3>
            <p>Applied</p>
          </div>
          <div className={styles.statCard}>
            <h3>{status.skipped}</h3>
            <p>Skipped</p>
          </div>
          <div className={styles.statCard}>
            <h3>
              {status.dailyLimit}/{status.maxLimit}
            </h3>
            <p>Daily Limit</p>
          </div>
        </div>

        <h3 className={styles.logsTitle}>Activity Logs</h3>
        <div className={styles.logContainer}>
          {logs.length === 0 ? (
            <div className={styles.logEmpty}>
              No logs yet. Start the scraper to see activity.
            </div>
          ) : (
            <>
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`${styles.logEntry} ${logTypeClass(log.type)}`}
                >
                  <span className={styles.logTime}>
                    [
                    {log.timestamp instanceof Date
                      ? log.timestamp.toLocaleTimeString()
                      : new Date(log.timestamp).toLocaleTimeString()}
                    ]
                  </span>{' '}
                  {log.message}
                </div>
              ))}
              <div ref={logEndRef} />
            </>
          )}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.jobHistoryHeader}>
          <h2>Job History</h2>
          <button
            className={`${styles.btn} ${styles.btnSecondary} ${styles.toggleBtn}`}
            onClick={() => {
              setShowJobHistory(!showJobHistory);
              if (!showJobHistory) fetchJobHistory();
            }}
          >
            {showJobHistory ? 'Hide' : 'Show'} ({jobStats.total} jobs)
          </button>
        </div>

        {showJobHistory && (
          <>
            <div className={`${styles.statusGrid} ${styles.statsGridMb}`}>
              <div className={`${styles.statCard} ${styles.statApplied}`}>
                <h3>{jobStats.applied}</h3>
                <p>Successfully Applied</p>
              </div>
              <div className={`${styles.statCard} ${styles.statRedirect}`}>
                <h3>{jobStats.redirect}</h3>
                <p>Website Redirect</p>
              </div>
              <div className={`${styles.statCard} ${styles.statFailed}`}>
                <h3>{jobStats.failed}</h3>
                <p>Apply Failed</p>
              </div>
              <div className={styles.statCard}>
                <h3>{jobStats.total}</h3>
                <p>Total Saved</p>
              </div>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.jobTable}>
                <thead className={styles.jobTableHead}>
                  <tr>
                    <th className={styles.jobTh}>Job Title</th>
                    <th className={styles.jobTh}>Company</th>
                    <th className={styles.jobTh}>Location</th>
                    <th className={styles.jobTh}>Status</th>
                    <th className={styles.jobTh}>Date</th>
                    <th className={styles.jobThCenter}>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {jobHistory.length === 0 ? (
                    <tr>
                      <td colSpan={6} className={styles.jobEmptyCell}>
                        No jobs found. Start the scraper to see job history.
                      </td>
                    </tr>
                  ) : (
                    jobHistory.map((job, index) => {
                      const isApplied =
                        job.appliedAt !== 'N/A' && !job.reason.includes('failed');
                      const isSkipped = job.reason !== 'N/A' && job.appliedAt === 'N/A';
                      const badgeClass = isApplied
                        ? styles.badgeApplied
                        : isSkipped
                          ? styles.badgeSkipped
                          : styles.badgeDefault;
                      return (
                        <tr key={index} className={styles.jobRow}>
                          <td className={styles.jobCellTitle}>
                            <div className={styles.jobTitleInner}>{job.title}</div>
                          </td>
                          <td className={styles.jobCell}>{job.company}</td>
                          <td className={styles.jobCellMuted}>
                            {job.location.length > 30
                              ? job.location.substring(0, 30) + '...'
                              : job.location}
                          </td>
                          <td className={styles.jobCell}>
                            <span className={`${styles.badge} ${badgeClass}`}>
                              {isApplied ? 'Applied' : job.reason}
                            </span>
                          </td>
                          <td className={styles.jobCellMuted}>
                            {job.appliedAt !== 'N/A'
                              ? new Date(job.appliedAt).toLocaleDateString()
                              : '-'}
                          </td>
                          <td className={styles.jobCellCenter}>
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.jobLink}
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
