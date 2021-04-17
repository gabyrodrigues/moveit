import styles from '../styles/components/Profile.module.css';

export default function Profile() {
	return (
		<div className={styles.profileContainer}>
			<img src="http://github.com/gabyrodrigues.png" alt="Gaby" />

			<div>
				<strong>Gabriely Rodrigues</strong>
				<p>
					<img src="icons/level.svg" alt="Level" />
					Level 1
				</p>
			</div>
		</div>
	);
}