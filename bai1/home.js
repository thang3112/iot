var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['15h', '16h', '17h', '18h', '19h', '20h'],
                datasets: [
                    {
                        label: 'Nhiệt độ',
                        data: [24, 23, 12, 11, 10, 10],
                        borderColor: 'red',
                        fill: false
                    },
                    {
                        label: 'Độ ẩm',
                        data: [50, 60, 65, 50, 40, 40],
                        borderColor: 'blue',
                        fill: false
                    },
                    {
                        label: 'Ánh sáng',
                        data: [97, 90, 83, 70 , 66, 50],
                        borderColor: 'yellow',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });


        var images = ['off.png', 'on.png'];
        var currentIndex = 0;
        function toggleLight() {
            var lightbulb = document.getElementById('lightbulb');
            var switchButton = document.getElementById('switch');

            if (lightbulb.src.includes('asets/off.png')) {
                lightbulb.src = 'asets/on.png';
                switchButton.classList.add('on');
            } else {
                lightbulb.src = '/asets/off.png';
                switchButton.classList.remove('on');
            }
        }
        function changeImage() {
            var lightbulb = document.getElementById('lightbulb');
            lightbulb.src = images[currentIndex];
            currentIndex = (currentIndex + 1) % images.length;
        }

        var imageElement = document.getElementById('image');
        var isRotating = false;
        var rotationInterval;

        function startRotation() {
            if (!isRotating) {
                imageElement.style.transformOrigin = 'center';
                imageElement.classList.add('rotate');
                isRotating = true;
                rotationInterval = setInterval(rotateImage, 1000);
            }
        }

        function rotateImage() {
            var currentRotation = parseInt(imageElement.style.transform.replace('rotate(', '').replace('deg)', ''));
            var newRotation = (currentRotation + 10) % 360;
            imageElement.style.transform = 'rotate(' + newRotation + 'deg)';
        }

        function stopRotation() {
            if (isRotating) {
                imageElement.classList.remove('rotate');
                isRotating = false;
                clearInterval(rotationInterval);
            }
        }