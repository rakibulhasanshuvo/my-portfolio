import { performance } from 'perf_hooks';

const iterations = 100000;
const date = new Date();

function benchmarkNew() {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  const end = performance.now();
  return end - start;
}

function benchmarkReuse() {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    formatter.format(date);
  }
  const end = performance.now();
  return end - start;
}

console.log('Running benchmark...');
const timeNew = benchmarkNew();
console.log(`toLocaleDateString (new object each time): ${timeNew.toFixed(2)}ms`);

const timeReuse = benchmarkReuse();
console.log(`Intl.DateTimeFormat (reused object): ${timeReuse.toFixed(2)}ms`);

const improvement = ((timeNew - timeReuse) / timeNew) * 100;
console.log(`Improvement: ${improvement.toFixed(2)}%`);
