// Automated Smoke Test Suite for PulseFit API Backend
import http from 'http';
import app from './server.js';

process.env.NODE_ENV = 'test';

const TEST_PORT = 5099;
let server;

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: 'localhost',
        port: TEST_PORT,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(data && { 'Content-Length': Buffer.byteLength(data) })
        }
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          try {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: raw ? JSON.parse(raw) : null
            });
          } catch (e) {
            resolve({ status: res.statusCode, headers: res.headers, body: raw });
          }
        });
      }
    );

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n🧪 Starting PulseFit API Smoke Tests...\n');

  server = app.listen(TEST_PORT);

  try {
    // 1. Health check
    console.log('Testing System Health & Root Info...');
    const health = await request('GET', '/api/health');
    assert(health.status === 200, 'GET /api/health returned 200');
    assert(health.body.status === 'healthy', 'Health status is "healthy"');

    const info = await request('GET', '/api');
    assert(info.status === 200, 'GET /api returned 200 directory');

    // 2. Trainers
    console.log('\nTesting Trainers Endpoints...');
    const trainers = await request('GET', '/api/trainers');
    assert(trainers.status === 200, 'GET /api/trainers returned 200');
    assert(trainers.body.trainers.length === 5, 'Returns 5 master coaches');

    const trainerOne = await request('GET', '/api/trainers/tr-1');
    assert(trainerOne.status === 200, 'GET /api/trainers/tr-1 returns coach details');
    assert(trainerOne.body.trainer.name.includes('Vikram'), 'Coach name is Vikram "Titan" Rathore');

    const slots = await request('GET', '/api/trainers/tr-1/slots');
    assert(slots.status === 200, 'GET /api/trainers/tr-1/slots returns 7-day schedule');
    assert(slots.body.schedule.length === 7, 'Schedule has 7 calendar days');

    // 3. Auth
    console.log('\nTesting Athlete Auth & Profile...');
    const register = await request('POST', '/api/auth/register', {
      name: 'Rohan Sharma',
      email: 'rohan.test@athlete.com',
      phone: '+91 99999 88888',
      goal: 'Muscle Hypertrophy & Strength'
    });
    assert(register.status === 201 || register.status === 200, 'POST /api/auth/register creates user');
    assert(register.body.user.name === 'Rohan Sharma', 'User name matches registered input');

    const login = await request('POST', '/api/auth/login', {
      email: 'rohan.test@athlete.com'
    });
    assert(login.status === 200, 'POST /api/auth/login returns user session');

    const profile = await request('GET', '/api/auth/me');
    assert(profile.status === 200, 'GET /api/auth/me returns active session');

    // 4. Memberships
    console.log('\nTesting Membership Tiers...');
    const plans = await request('GET', '/api/memberships');
    assert(plans.status === 200, 'GET /api/memberships returns plans');
    assert(plans.body.plans.length === 3, 'Returns Starter, Pro Beast, and Elite VIP tiers');

    const enroll = await request('POST', '/api/memberships/enroll', {
      planId: 'elite-vip',
      billingCycle: 'annual',
      paymentMethod: 'upi'
    });
    assert(enroll.status === 200, 'POST /api/memberships/enroll activates plan');
    assert(enroll.body.enrollment.plan.id === 'elite-vip', 'Enrolled in Elite VIP tier');

    // 5. Bookings
    console.log('\nTesting Trainer Slot Bookings...');
    const newBooking = await request('POST', '/api/bookings', {
      trainerId: 'tr-1',
      date: '2026-09-25',
      timeSlot: '07:30 AM - 08:30 AM',
      focus: 'Compound Lifting Technique'
    });
    assert(newBooking.status === 201, 'POST /api/bookings reserves 60-min slot');
    const bookingId = newBooking.body.booking.id;

    const bookingsList = await request('GET', '/api/bookings');
    assert(bookingsList.status === 200, 'GET /api/bookings returns booked list');
    assert(bookingsList.body.bookings.some((b) => b.id === bookingId), 'Newly booked slot exists in list');

    const cancel = await request('DELETE', `/api/bookings/${bookingId}`);
    assert(cancel.status === 200, 'DELETE /api/bookings/:id releases booked slot');

    // 6. Facilities & Inquiries
    console.log('\nTesting Facilities & Inquiries...');
    const facilities = await request('GET', '/api/facilities');
    assert(facilities.status === 200, 'GET /api/facilities returns facility details');

    const inquiry = await request('POST', '/api/facilities/inquiry', {
      name: 'Pooja Verma',
      email: 'pooja@test.com',
      message: 'Interested in annual membership'
    });
    assert(inquiry.status === 201, 'POST /api/facilities/inquiry records contact inquiry');

    console.log(`\n========================================`);
    console.log(`🎯 Test Summary: ${passed} Passed, ${failed} Failed`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exitCode = 1;
    }
  } catch (err) {
    console.error('Smoke tests crashed with error:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
}

runTests();
