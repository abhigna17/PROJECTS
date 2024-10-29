// LoginFrame.java
import javax.swing.*;
import java.awt.*;

public class LoginFrame extends JFrame {
    private JTextField usernameField;
    private JPasswordField passwordField;
    private JButton loginButton;
    private JButton signupButton;

    public LoginFrame() {
        setTitle("Login");
        setSize(300, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JPanel panel = new JPanel(new GridLayout(3, 2, 10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        panel.add(new JLabel("Username:"));
        usernameField = new JTextField();
        panel.add(usernameField);

        panel.add(new JLabel("Password:"));
        passwordField = new JPasswordField();
        panel.add(passwordField);

        loginButton = new JButton("Login");
        signupButton = new JButton("Sign Up");

        panel.add(loginButton);
        panel.add(signupButton);

        add(panel);

        loginButton.addActionListener(e -> login());
        signupButton.addActionListener(e -> showSignupDialog());
    }

    private void login() {
        String username = usernameField.getText();
        String password = new String(passwordField.getPassword());

        if (Database.validateUser(username, password)) {
            new MainFrame(username).setVisible(true);
            dispose();
        } else {
            JOptionPane.showMessageDialog(this, "Invalid credentials!");
        }
    }

    private void showSignupDialog() {
        JDialog dialog = new JDialog(this, "Sign Up", true);
        dialog.setLayout(new GridLayout(4, 2, 10, 10));
        dialog.setSize(300, 200);
        dialog.setLocationRelativeTo(this);

        JTextField newUsername = new JTextField();
        JPasswordField newPassword = new JPasswordField();
        JPasswordField confirmPassword = new JPasswordField();

        dialog.add(new JLabel("Username:"));
        dialog.add(newUsername);
        dialog.add(new JLabel("Password:"));
        dialog.add(newPassword);
        dialog.add(new JLabel("Confirm Password:"));
        dialog.add(confirmPassword);

        JButton submitButton = new JButton("Submit");
        submitButton.addActionListener(e -> {
            String username = newUsername.getText();
            String password = new String(newPassword.getPassword());
            String confirm = new String(confirmPassword.getPassword());

            if (!password.equals(confirm)) {
                JOptionPane.showMessageDialog(dialog, "Passwords don't match!");
                return;
            }

            if (Database.registerUser(username, password)) {
                dialog.dispose();
                JOptionPane.showMessageDialog(this, "Registration successful!");
            } else {
                JOptionPane.showMessageDialog(dialog, "Username already exists!");
            }
        });

        JButton cancelButton = new JButton("Cancel");
        cancelButton.addActionListener(e -> dialog.dispose());

        dialog.add(submitButton);
        dialog.add(cancelButton);
        dialog.setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new LoginFrame().setVisible(true));
    }
}
