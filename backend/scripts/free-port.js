const { execSync } = require('child_process');

const port = process.argv[2] || '5000';

const getWindowsPids = (targetPort) => {
  const output = execSync(`netstat -ano -p tcp | findstr :${targetPort}`, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore'],
  });

  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && line.includes('LISTENING'))
    .map((line) => line.split(/\s+/).pop())
    .filter(Boolean);
};

const getUnixPids = (targetPort) => {
  const output = execSync(`lsof -ti tcp:${targetPort}`, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore'],
  });

  return output
    .split(/\r?\n/)
    .map((pid) => pid.trim())
    .filter(Boolean);
};

const killPid = (pid) => {
  if (process.platform === 'win32') {
    execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
    return;
  }

  execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
};

try {
  const rawPids =
    process.platform === 'win32' ? getWindowsPids(port) : getUnixPids(port);
  const pids = [...new Set(rawPids)].filter((pid) => pid !== String(process.pid));

  if (pids.length === 0) {
    process.exit(0);
  }

  pids.forEach((pid) => {
    try {
      killPid(pid);
      console.log(`Freed port ${port} by stopping PID ${pid}`);
    } catch (error) {
      // Ignore kill errors so dev startup can continue.
    }
  });
} catch (error) {
  process.exit(0);
}